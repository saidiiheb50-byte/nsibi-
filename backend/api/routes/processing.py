from fastapi import APIRouter, File, UploadFile, HTTPException, BackgroundTasks
from typing import List, Optional
from pydantic import BaseModel
import os
import uuid
import shutil
from pathlib import Path

import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent.parent.parent))

from api.services.preprocessing import PreprocessingService
from api.services.ai_processing import AIProcessingService
from api.services.dem_generation import DEMGenerationService

router = APIRouter()

# Create upload directories
UPLOAD_DIR = Path("uploads")
PROCESSED_DIR = Path("processed")
UPLOAD_DIR.mkdir(exist_ok=True)
PROCESSED_DIR.mkdir(exist_ok=True)

class ProcessingRequest(BaseModel):
    resolution: float = 0.1  # meters
    contour_interval: float = 1.0  # meters
    enable_slope: bool = True
    enable_aspect: bool = True

@router.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    """Upload drone images, LiDAR, or GNSS data"""
    file_ids = []
    
    for file in files:
        file_id = str(uuid.uuid4())
        file_path = UPLOAD_DIR / f"{file_id}_{file.filename}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        file_ids.append({
            "id": file_id,
            "filename": file.filename,
            "size": file_path.stat().st_size,
            "type": file.filename.split(".")[-1].lower()
        })
    
    return {"files": file_ids}

@router.post("/process/{file_id}")
async def process_file(
    file_id: str,
    request: ProcessingRequest,
    background_tasks: BackgroundTasks
):
    """Process uploaded file with AI"""
    file_path = None
    for f in UPLOAD_DIR.glob(f"{file_id}_*"):
        file_path = f
        break
    
    if not file_path or not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    # Start processing
    preprocessing = PreprocessingService()
    ai_service = AIProcessingService()
    dem_service = DEMGenerationService()
    
    try:
        # Step 1: Preprocessing
        processed_data = await preprocessing.process(file_path, file_path.suffix)
        
        # Step 2: AI Processing
        classified_data = await ai_service.classify_terrain(processed_data)
        cleaned_data = await ai_service.remove_noise(classified_data)
        
        # Step 3: DEM Generation
        dem = await dem_service.generate_dem(
            cleaned_data,
            resolution=request.resolution
        )
        
        # Step 4: Contour Generation
        contours_path = await dem_service.generate_contours(
            dem,
            interval=request.contour_interval
        )
        
        # Load contour count from JSON
        import json
        with open(contours_path) as f:
            contour_data = json.load(f)
        
        # Step 5: Analysis (if enabled)
        results = {
            "dem": {
                "status": "ready",
                "resolution": f"{request.resolution*100}cm",
                "path": str(dem)
            },
            "contours": {
                "status": "ready",
                "count": contour_data.get("count", 0),
                "interval": f"{request.contour_interval}m",
                "path": str(contours_path)
            }
        }
        
        if request.enable_slope:
            slope = await dem_service.calculate_slope(dem)
            results["slope"] = {"status": "ready", "path": str(slope)}
        
        if request.enable_aspect:
            aspect = await dem_service.calculate_aspect(dem)
            results["aspect"] = {"status": "ready", "path": str(aspect)}
        
        return results
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status/{file_id}")
async def get_processing_status(file_id: str):
    """Get processing status for a file"""
    # TODO: Implement status tracking
    return {"status": "processing", "progress": 50}

