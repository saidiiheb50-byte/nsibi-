from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from typing import Optional
from pathlib import Path
import os

from api.services.export_service import ExportService

router = APIRouter()
EXPORT_DIR = Path("exports")
EXPORT_DIR.mkdir(exist_ok=True)

@router.get("/dwg/{file_id}")
async def export_dwg(file_id: str):
    """Export contours to AutoCAD DWG format"""
    export_service = ExportService()
    
    try:
        output_path = await export_service.export_to_dwg(file_id)
        return FileResponse(
            output_path,
            media_type="application/acad",
            filename=f"{file_id}_contours.dwg"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dxf/{file_id}")
async def export_dxf(file_id: str):
    """Export contours to AutoCAD DXF format"""
    export_service = ExportService()
    
    try:
        output_path = await export_service.export_to_dxf(file_id)
        return FileResponse(
            output_path,
            media_type="application/dxf",
            filename=f"{file_id}_contours.dxf"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/shp/{file_id}")
async def export_shp(file_id: str):
    """Export to Shapefile format"""
    export_service = ExportService()
    
    try:
        output_path = await export_service.export_to_shp(file_id)
        # Return zip file for shapefile
        return FileResponse(
            output_path,
            media_type="application/zip",
            filename=f"{file_id}_contours.zip"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/csv/{file_id}")
async def export_csv(file_id: str):
    """Export points to CSV format"""
    export_service = ExportService()
    
    try:
        output_path = await export_service.export_to_csv(file_id)
        return FileResponse(
            output_path,
            media_type="text/csv",
            filename=f"{file_id}_points.csv"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/xml/{file_id}")
async def export_landxml(file_id: str):
    """Export to LandXML format"""
    export_service = ExportService()
    
    try:
        output_path = await export_service.export_to_landxml(file_id)
        return FileResponse(
            output_path,
            media_type="application/xml",
            filename=f"{file_id}_surface.xml"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



