# TopoAI - AI-Assisted Topographic Mapping Software

**From raw drone/LiDAR data → clean topographic maps automatically**

A modern web application that automates 70-80% of topographic mapping work using AI-powered processing.

## 🚀 Features

- **Multi-Format Support**: Process drone images (JPG/TIFF), LiDAR (.LAS/.LAZ), GNSS points, and GCP files
- **AI Terrain Detection**: Automatically detect hills, valleys, roads, riverbeds, and man-made structures
- **Automatic Noise Cleaning**: Remove trees, buildings, cars, and outliers using ML
- **DEM/DTM/DSM Generation**: Create Digital Elevation Models with customizable resolution (5cm to 50cm)
- **Auto Contour Lines**: Generate smooth, labeled contour lines with user-defined intervals
- **Slope & Aspect Analysis**: Calculate slope maps, aspect direction, and hillshade visualization
- **One-Click Export**: Export to AutoCAD (DWG/DXF), Civil 3D, Shapefile, CSV, and LandXML

## 🛠️ Technology Stack

**Frontend:**
- Next.js 14 with TypeScript
- React Three Fiber for 3D visualization
- Tailwind CSS for modern UI

**Backend:**
- FastAPI (Python)
- AI/ML: NumPy, SciPy, scikit-learn
- GIS: Rasterio, GeoPandas (optional)

## 📦 Installation

See `INSTALL.md` for detailed installation instructions.

### Quick Start

**Backend:**
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows
pip install -r requirements.txt
cd backend
python main.py
```

**Frontend:**
```bash
npm install
npm run dev
```

## 🎯 Usage

1. Upload drone images or LiDAR files
2. Configure processing settings (resolution, contour interval)
3. Process with AI-powered analysis
4. Visualize 3D terrain
5. Export results in your preferred format

## 📄 License

Private project - All rights reserved

## 👥 Contributors

[Your Name/Team]

