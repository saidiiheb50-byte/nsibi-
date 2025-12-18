import numpy as np
from typing import Dict, Any
from sklearn.ensemble import RandomForestClassifier
from sklearn.cluster import DBSCAN

class AIProcessingService:
    """AI-powered terrain classification and noise removal"""
    
    def __init__(self):
        # Initialize models (simplified - would load trained models in production)
        self.ground_classifier = None
        self.terrain_detector = None
    
    async def classify_terrain(self, data: Dict[str, Any]):
        """Classify terrain features using AI"""
        if data["type"] == "lidar":
            points = data["points"]
            
            # Ground classification (simplified)
            ground_mask = self.classify_ground(points)
            
            # Terrain feature detection
            features = self.detect_terrain_features(points, ground_mask)
            
            return {
                **data,
                "ground_mask": ground_mask,
                "features": features
            }
        
        return data
    
    async def remove_noise(self, data: Dict[str, Any]):
        """Remove noise using ML-based filtering"""
        if data["type"] == "lidar":
            points = data["points"]
            ground_mask = data.get("ground_mask", np.ones(len(points), dtype=bool))
            
            # Remove non-ground points (trees, buildings, etc.)
            ground_points = points[ground_mask]
            
            # Additional outlier removal
            cleaned_points = self.remove_outliers(ground_points)
            
            return {
                **data,
                "points": cleaned_points,
                "count": len(cleaned_points)
            }
        
        return data
    
    def classify_ground(self, points: np.ndarray):
        """Classify ground vs non-ground points"""
        # Simplified ground classification
        # In production, would use trained PointNet/PointNet++ model
        z_values = points[:, 2]
        threshold = np.percentile(z_values, 20)  # Bottom 20% likely ground
        
        return z_values < threshold + (np.max(z_values) - np.min(z_values)) * 0.3
    
    def detect_terrain_features(self, points: np.ndarray, ground_mask: np.ndarray):
        """Detect terrain features (hills, valleys, etc.)"""
        ground_points = points[ground_mask]
        
        # Simple feature detection based on elevation
        z_values = ground_points[:, 2]
        mean_z = np.mean(z_values)
        std_z = np.std(z_values)
        
        features = {
            "hills": ground_points[z_values > mean_z + std_z],
            "valleys": ground_points[z_values < mean_z - std_z],
            "flat": ground_points[np.abs(z_values - mean_z) < std_z * 0.5]
        }
        
        return features
    
    def remove_outliers(self, points: np.ndarray, eps: float = 0.5, min_samples: int = 5):
        """Remove outliers using DBSCAN clustering"""
        clustering = DBSCAN(eps=eps, min_samples=min_samples).fit(points)
        labels = clustering.labels_
        
        # Keep largest cluster (assumed to be main terrain)
        unique_labels, counts = np.unique(labels[labels >= 0], return_counts=True)
        if len(unique_labels) > 0:
            main_cluster = unique_labels[np.argmax(counts)]
            return points[labels == main_cluster]
        
        return points



