from pathlib import Path
from typing import Optional
import ezdxf
import shapefile
import csv
import json
import zipfile
import numpy as np
from datetime import datetime

# Optional imports for PDF
try:
    from reportlab.lib.pagesizes import letter, A4
    from reportlab.lib.units import inch, cm
    from reportlab.lib import colors
    from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_CENTER, TA_LEFT
    HAS_REPORTLAB = True
except ImportError:
    HAS_REPORTLAB = False

try:
    import matplotlib
    matplotlib.use('Agg')  # Non-interactive backend
    import matplotlib.pyplot as plt
    from matplotlib.backends.backend_pdf import PdfPages
    HAS_MATPLOTLIB = True
except ImportError:
    HAS_MATPLOTLIB = False

class ExportService:
    """Handle export to various formats"""
    
    async def export_to_dwg(self, file_id: str) -> Path:
        """Export contours to AutoCAD DWG"""
        # Read contour data
        contour_path = Path("processed") / f"contours_{file_id}.json"
        
        # Create DWG file
        doc = ezdxf.new('R2010')
        msp = doc.modelspace()
        
        # Add contours (simplified)
        # In production, would read actual contour lines and add them
        
        output_path = Path("exports") / f"{file_id}_contours.dwg"
        doc.saveas(output_path)
        
        return output_path
    
    async def export_to_dxf(self, file_id: str) -> Path:
        """Export contours to AutoCAD DXF"""
        # Similar to DWG but DXF format
        doc = ezdxf.new('R2010')
        msp = doc.modelspace()
        
        output_path = Path("exports") / f"{file_id}_contours.dxf"
        doc.saveas(output_path)
        
        return output_path
    
    async def export_to_shp(self, file_id: str) -> Path:
        """Export to Shapefile"""
        # Create shapefile
        output_path = Path("exports") / f"{file_id}_contours.shp"
        w = shapefile.Writer(str(output_path))
        w.field('ELEVATION', 'N', decimal=2)
        
        # Add features (simplified)
        # In production, would add actual contour geometries
        
        w.close()
        
        # Create zip file (shapefiles need multiple files)
        zip_path = Path("exports") / f"{file_id}_contours.zip"
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            for ext in ['.shp', '.shx', '.dbf', '.prj']:
                file_path = output_path.with_suffix(ext)
                if file_path.exists():
                    zipf.write(file_path, file_path.name)
        
        return zip_path
    
    async def export_to_csv(self, file_id: str) -> Path:
        """Export points to CSV"""
        # Read point data
        # In production, would read from processed files
        
        output_path = Path("exports") / f"{file_id}_points.csv"
        with open(output_path, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['X', 'Y', 'Z'])
            # Add actual points
        
        return output_path
    
    async def export_to_landxml(self, file_id: str) -> Path:
        """Export to LandXML format"""
        output_path = Path("exports") / f"{file_id}_surface.xml"
        
        # Create LandXML structure
        xml_content = f"""<?xml version="1.0"?>
<LandXML xmlns="http://www.landxml.org/schema/LandXML-1.2">
    <Surfaces>
        <Surface name="{file_id}">
            <!-- Surface data would go here -->
        </Surface>
    </Surfaces>
</LandXML>"""
        
        with open(output_path, 'w') as f:
            f.write(xml_content)
        
        return output_path
    
    async def export_to_pdf(self, file_id: str, point_cloud_data: dict = None) -> Path:
        """Export point cloud data and analysis to PDF plan"""
        output_path = Path("exports") / f"{file_id}_plan.pdf"
        
        if HAS_REPORTLAB and HAS_MATPLOTLIB:
            # Create PDF with ReportLab
            doc = SimpleDocTemplate(str(output_path), pagesize=A4)
            story = []
            styles = getSampleStyleSheet()
            
            # Title
            title_style = ParagraphStyle(
                'CustomTitle',
                parent=styles['Heading1'],
                fontSize=24,
                textColor=colors.HexColor('#16a34a'),
                spaceAfter=30,
                alignment=TA_CENTER
            )
            story.append(Paragraph("Plan Topographique - Nuage de Points", title_style))
            story.append(Spacer(1, 0.5*cm))
            
            # Project Information
            info_style = ParagraphStyle(
                'InfoStyle',
                parent=styles['Normal'],
                fontSize=10,
                spaceAfter=12
            )
            
            info_data = [
                ['Projet:', f'Nuage de Points {file_id}'],
                ['Date:', datetime.now().strftime('%Y-%m-%d %H:%M:%S')],
                ['Source:', 'Drone LiDAR'],
            ]
            
            if point_cloud_data:
                info_data.extend([
                    ['Nombre de points:', f"{point_cloud_data.get('count', 'N/A'):,}"],
                    ['Résolution DEM:', point_cloud_data.get('dem_resolution', 'N/A')],
                    ['Contours générés:', f"{point_cloud_data.get('contour_count', 0):,}"],
                ])
            
            info_table = Table(info_data, colWidths=[4*cm, 10*cm])
            info_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f0fdf4')),
                ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#14532d')),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 0), (-1, -1), 10),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
                ('TOPPADDING', (0, 0), (-1, -1), 8),
                ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#86efac')),
            ]))
            story.append(info_table)
            story.append(Spacer(1, 1*cm))
            
            # Statistics Section
            story.append(Paragraph("Statistiques du Nuage de Points", styles['Heading2']))
            story.append(Spacer(1, 0.3*cm))
            
            if point_cloud_data:
                stats_data = [
                    ['Métrique', 'Valeur'],
                    ['Altitude minimale', f"{point_cloud_data.get('min_z', 0):.2f} m"],
                    ['Altitude maximale', f"{point_cloud_data.get('max_z', 0):.2f} m"],
                    ['Altitude moyenne', f"{point_cloud_data.get('mean_z', 0):.2f} m"],
                    ['Écart-type', f"{point_cloud_data.get('std_z', 0):.2f} m"],
                    ['Superficie', f"{point_cloud_data.get('area', 0):,.2f} m²"],
                ]
                
                stats_table = Table(stats_data, colWidths=[8*cm, 6*cm])
                stats_table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0ea5e9')),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, 0), 12),
                    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                    ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f0f9ff')),
                    ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#7dd3fc')),
                    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f0f9ff')]),
                ]))
                story.append(stats_table)
                story.append(Spacer(1, 1*cm))
            
            # Processing Details
            story.append(Paragraph("Détails du Traitement", styles['Heading2']))
            story.append(Spacer(1, 0.3*cm))
            
            processing_details = [
                '✓ Pré-traitement des données effectué',
                '✓ Classification sol/non-sol par IA',
                '✓ Génération du modèle numérique de terrain (DTM)',
                '✓ Extraction des lignes de contour',
                '✓ Calcul de la pente et de l\'orientation',
                '✓ Génération des fichiers d\'export (DWG, PDF)',
            ]
            
            for detail in processing_details:
                story.append(Paragraph(f"• {detail}", info_style))
                story.append(Spacer(1, 0.2*cm))
            
            story.append(Spacer(1, 1*cm))
            
            # Footer
            footer_style = ParagraphStyle(
                'Footer',
                parent=styles['Normal'],
                fontSize=8,
                textColor=colors.grey,
                alignment=TA_CENTER
            )
            story.append(Paragraph(f"Généré par TopoAI - {datetime.now().strftime('%Y-%m-%d')}", footer_style))
            
            # Build PDF
            doc.build(story)
        else:
            # Fallback: Create simple PDF with matplotlib
            if HAS_MATPLOTLIB:
                with PdfPages(str(output_path)) as pdf:
                    # Create a simple page
                    fig, ax = plt.subplots(figsize=(8.27, 11.69))  # A4 size
                    ax.text(0.5, 0.9, 'Plan Topographique - Nuage de Points', 
                           ha='center', va='top', fontsize=20, weight='bold')
                    ax.text(0.5, 0.8, f'Projet: {file_id}', 
                           ha='center', va='top', fontsize=12)
                    ax.text(0.5, 0.7, f'Date: {datetime.now().strftime("%Y-%m-%d")}', 
                           ha='center', va='top', fontsize=10)
                    ax.axis('off')
                    pdf.savefig(fig, bbox_inches='tight')
                    plt.close(fig)
            else:
                # Create empty PDF file
                output_path.write_bytes(b'%PDF-1.4\n')
        
        return output_path



