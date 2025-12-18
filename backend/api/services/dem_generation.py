import numpy as np
from pathlib import Path
from scipy.interpolate import griddata
from scipy.ndimage import gaussian_filter
from typing import Dict, Any, Tuple
import json

# Optional imports
try:
    import rasterio
    from rasterio.transform import from_bounds
    HAS_RASTERIO = True
except ImportError:
    HAS_RASTERIO = False

class DEMGenerationService:
    """Generate DEM, DTM, DSM and contour lines"""
    
    async def generate_dem(
        self,
        data: Dict[str, Any],
        resolution: float = 0.1,
        method: str = "kriging"
    ) -> Path:
        """Generate Digital Elevation Model"""
        if data["type"] != "lidar":
            raise ValueError("DEM generation requires LiDAR data")
        
        points = data["points"]
        
        # Create grid
        x_min, x_max = np.min(points[:, 0]), np.max(points[:, 0])
        y_min, y_max = np.min(points[:, 1]), np.max(points[:, 1])
        
        x_res = int((x_max - x_min) / resolution)
        y_res = int((y_max - y_min) / resolution)
        
        xi = np.linspace(x_min, x_max, x_res)
        yi = np.linspace(y_min, y_max, y_res)
        xi, yi = np.meshgrid(xi, yi)
        
        # Interpolate
        zi = griddata(
            (points[:, 0], points[:, 1]),
            points[:, 2],
            (xi, yi),
            method='linear',
            fill_value=np.nan
        )
        
        # Smooth
        zi = gaussian_filter(zi, sigma=1.0)
        
        # Save as GeoTIFF or NumPy file
        output_path = Path("processed") / f"dem_{data.get('id', 'temp')}"
        
        if HAS_RASTERIO:
            output_path = output_path.with_suffix('.tif')
            transform = from_bounds(x_min, y_min, x_max, y_max, x_res, y_res)
            
            with rasterio.open(
                output_path,
                'w',
                driver='GTiff',
                height=y_res,
                width=x_res,
                count=1,
                dtype=zi.dtype,
                crs='EPSG:4326',
                transform=transform,
            ) as dst:
                dst.write(zi, 1)
        else:
            # Fallback: save as NumPy file
            output_path = output_path.with_suffix('.npy')
            np.save(output_path, zi)
        
        return output_path
    
    async def generate_contours(
        self,
        dem_path: Path,
        interval: float = 1.0
    ) -> Path:
        """Generate contour lines from DEM"""
        
        # Read DEM
        if HAS_RASTERIO and dem_path.suffix == '.tif':
            with rasterio.open(dem_path) as src:
                dem = src.read(1)
                transform = src.transform
                bounds = src.bounds
        else:
            # Fallback: load NumPy file
            dem = np.load(dem_path)
            # Create dummy bounds
            bounds = type('Bounds', (), {
                'left': 0, 'right': dem.shape[1],
                'bottom': 0, 'top': dem.shape[0]
            })()
        
        # Generate contours
        x = np.linspace(bounds.left, bounds.right, dem.shape[1])
        y = np.linspace(bounds.bottom, bounds.top, dem.shape[0])
        X, Y = np.meshgrid(x, y)
        
        # Calculate contour levels
        z_min, z_max = np.nanmin(dem), np.nanmax(dem)
        levels = np.arange(
            np.floor(z_min / interval) * interval,
            np.ceil(z_max / interval) * interval,
            interval
        )
        
        # Save contours (simplified - would export to proper format)
        output_path = Path("processed") / f"contours_{dem_path.stem}.json"
        
        # In production, would export to GeoJSON or Shapefile
        contour_data = {
            "levels": levels.tolist(),
            "count": len(levels)
        }
        
        with open(output_path, 'w') as f:
            json.dump(contour_data, f)
        
        return output_path
    
    async def calculate_slope(self, dem_path: Path) -> Path:
        """Calculate slope map"""
        if HAS_RASTERIO and dem_path.suffix == '.tif':
            with rasterio.open(dem_path) as src:
                dem = src.read(1)
                transform = src.transform
        else:
            dem = np.load(dem_path)
            transform = None
        
        # Calculate gradients
        dy, dx = np.gradient(dem)
        dx = dx / abs(transform[0])  # Convert to real units
        dy = dy / abs(transform[4])
        
        # Calculate slope in degrees
        slope = np.arctan(np.sqrt(dx**2 + dy**2)) * 180 / np.pi
        
        # Save
        if HAS_RASTERIO and transform:
            output_path = Path("processed") / f"slope_{dem_path.stem}.tif"
            with rasterio.open(
                output_path,
                'w',
                driver='GTiff',
                height=slope.shape[0],
                width=slope.shape[1],
                count=1,
                dtype=slope.dtype,
                crs='EPSG:4326',
                transform=transform,
            ) as dst:
                dst.write(slope, 1)
        else:
            output_path = Path("processed") / f"slope_{dem_path.stem}.npy"
            np.save(output_path, slope)
        
        return output_path
    
    async def calculate_aspect(self, dem_path: Path) -> Path:
        """Calculate aspect (direction of slope)"""
        if HAS_RASTERIO and dem_path.suffix == '.tif':
            with rasterio.open(dem_path) as src:
                dem = src.read(1)
                transform = src.transform
        else:
            dem = np.load(dem_path)
            transform = None
        
        # Calculate gradients
        dy, dx = np.gradient(dem)
        
        # Calculate aspect in degrees (0-360)
        aspect = (np.arctan2(-dy, dx) * 180 / np.pi + 360) % 360
        
        # Save
        if HAS_RASTERIO and transform:
            output_path = Path("processed") / f"aspect_{dem_path.stem}.tif"
            with rasterio.open(
                output_path,
                'w',
                driver='GTiff',
                height=aspect.shape[0],
                width=aspect.shape[1],
                count=1,
                dtype=aspect.dtype,
                crs='EPSG:4326',
                transform=transform,
            ) as dst:
                dst.write(aspect, 1)
        else:
            output_path = Path("processed") / f"aspect_{dem_path.stem}.npy"
            np.save(output_path, aspect)
        
        return output_path

