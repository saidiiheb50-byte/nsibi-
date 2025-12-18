import numpy as np
from pathlib import Path
from typing import Union

# Optional imports
try:
    import laspy
    HAS_LASPY = True
except ImportError:
    HAS_LASPY = False

try:
    import cv2
    HAS_OPENCV = True
except ImportError:
    HAS_OPENCV = False

class PreprocessingService:
    """Handles data preprocessing for drone images and LiDAR"""
    
    async def process(self, file_path: Path, file_type: str):
        """Process input file based on type"""
        if file_type in ['.las', '.laz']:
            return await self.process_lidar(file_path)
        elif file_type in ['.jpg', '.jpeg', '.tiff', '.tif']:
            return await self.process_image(file_path)
        elif file_type == '.csv':
            return await self.process_csv(file_path)
        else:
            raise ValueError(f"Unsupported file type: {file_type}")
    
    async def process_lidar(self, file_path: Path):
        """Process LiDAR point cloud"""
        if not HAS_LASPY:
            raise ValueError("laspy is not installed. Install it with: pip install laspy")
        
        # Read LAS/LAZ file
        las = laspy.read(str(file_path))
        
        # Extract points
        points = np.vstack((las.x, las.y, las.z)).transpose()
        
        # Noise filtering
        filtered_points = self.filter_noise(points)
        
        # Height normalization
        normalized_points = self.normalize_height(filtered_points)
        
        return {
            "type": "lidar",
            "points": normalized_points,
            "count": len(normalized_points)
        }
    
    async def process_image(self, file_path: Path):
        """Process drone image"""
        if not HAS_OPENCV:
            # Fallback to Pillow if OpenCV not available
            from PIL import Image
            img = Image.open(file_path)
            return {
                "type": "image",
                "path": str(file_path),
                "shape": img.size
            }
        
        # Read image
        img = cv2.imread(str(file_path))
        
        # Basic preprocessing
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Feature detection (for SfM)
        # This is a simplified version
        return {
            "type": "image",
            "path": str(file_path),
            "shape": img.shape
        }
    
    async def process_csv(self, file_path: Path):
        """Process GNSS/GCP CSV file"""
        import pandas as pd
        df = pd.read_csv(file_path)
        
        return {
            "type": "csv",
            "points": df.to_dict('records'),
            "count": len(df)
        }
    
    def filter_noise(self, points: np.ndarray, threshold: float = 3.0):
        """Remove outliers using statistical filtering"""
        z_scores = np.abs((points[:, 2] - np.mean(points[:, 2])) / np.std(points[:, 2]))
        return points[z_scores < threshold]
    
    def normalize_height(self, points: np.ndarray):
        """Normalize height values"""
        min_z = np.min(points[:, 2])
        points[:, 2] -= min_z
        return points

