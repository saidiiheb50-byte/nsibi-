# TopoAI - AI-Assisted Topographic Mapping Software

**From raw drone/LiDAR data → clean topographic maps automatically**

A modern web application that automates 70-80% of topographic mapping work using AI-powered processing.

## 🚀 Features

### Core Capabilities
- **Multi-Format Support**: Process drone images (JPG/TIFF), LiDAR (.LAS/.LAZ), GNSS points, and GCP files
- **AI Terrain Detection**: Automatically detect hills, valleys, roads, riverbeds, and man-made structures
- **Automatic Noise Cleaning**: Remove trees, buildings, cars, and outliers using ML
- **DEM/DTM/DSM Generation**: Create Digital Elevation Models with customizable resolution (5cm to 50cm)
- **Auto Contour Lines**: Generate smooth, labeled contour lines with user-defined intervals
- **Slope & Aspect Analysis**: Calculate slope maps, aspect direction, and hillshade visualization
- **One-Click Export**: Export to AutoCAD (DWG/DXF), Civil 3D, Shapefile, CSV, and LandXML

### Technology Stack

**Frontend:**
- Next.js 14 with TypeScript
- React Three Fiber for 3D visualization
- Tailwind CSS for modern UI
- Framer Motion for animations

**Backend:**
- FastAPI (Python)
- AI/ML: PyTorch, TensorFlow, scikit-learn
- GIS: GDAL, Rasterio, GeoPandas
- Point Cloud: PDAL, LasPy

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- GDAL (for GIS processing)

### Frontend Setup

**Windows (PowerShell):**
```powershell
# Option 1: Use the installation script (recommended)
.\install-frontend.ps1

# Option 2: Manual installation
npm install
```

**Linux/Mac:**
```bash
npm install
```

**Run development server:**
```bash
npm run dev
```

Visit `http://localhost:3000`

**Note:** See `INSTALL.md` for detailed installation instructions and troubleshooting.

### Backend Setup

**Windows (PowerShell):**
```powershell
# Option 1: Use the installation script (recommended)
.\install-backend.ps1

# Option 2: Manual installation
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

# Run API server
cd backend
python main.py
```

**Linux/Mac:**
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run API server
cd backend
python main.py
```

**Note:** On Windows, use `python -m pip` instead of just `pip` if pip is not recognized.

API will be available at `http://localhost:8000`

## 🎯 Usage

1. **Upload Data**: Drag and drop your drone images or LiDAR files
2. **Configure Settings**: Set DEM resolution, contour interval, and analysis options
3. **Process**: Click "Start Processing" to run AI-powered analysis
4. **Visualize**: View 3D terrain in the interactive map viewer
5. **Export**: Download results in your preferred format (DWG, DXF, SHP, CSV, XML)

## 🏗️ Project Structure

```
topo/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Main dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── MapViewer.tsx     # 3D terrain visualization
│   ├── ProcessingPanel.tsx
│   └── ExportPanel.tsx
├── backend/               # FastAPI backend
│   ├── main.py           # API entry point
│   └── api/
│       ├── routes/        # API endpoints
│       └── services/      # Business logic
└── requirements.txt       # Python dependencies
```

## 🔧 API Endpoints

### Processing
- `POST /api/processing/upload` - Upload files
- `POST /api/processing/process/{file_id}` - Process file with AI
- `GET /api/processing/status/{file_id}` - Get processing status

### Export
- `GET /api/export/dwg/{file_id}` - Export to DWG
- `GET /api/export/dxf/{file_id}` - Export to DXF
- `GET /api/export/shp/{file_id}` - Export to Shapefile
- `GET /api/export/csv/{file_id}` - Export to CSV
- `GET /api/export/xml/{file_id}` - Export to LandXML

### Analysis
- `POST /api/analysis/accuracy` - Calculate accuracy metrics
- `GET /api/analysis/statistics/{file_id}` - Get terrain statistics

## 🎨 UI Features

- **Modern Design**: Dark theme with gradient backgrounds
- **Responsive Layout**: Works on desktop and tablet
- **3D Visualization**: Interactive Three.js terrain viewer
- **Real-time Progress**: Live updates during processing
- **Drag & Drop**: Easy file upload interface

## 🧠 AI Processing Pipeline

1. **Pre-processing**: Image alignment, point cloud filtering, noise removal
2. **AI Classification**: Ground vs non-ground classification using ML
3. **Terrain Detection**: Identify hills, valleys, and features
4. **DEM Generation**: Interpolate to create elevation models
5. **Contour Extraction**: Generate smooth contour lines
6. **Analysis**: Calculate slope, aspect, and other metrics

## 📊 Supported Formats

**Input:**
- Images: JPG, JPEG, TIFF, TIF
- Point Clouds: LAS, LAZ
- GNSS: CSV
- GCP: CSV, TXT

**Output:**
- AutoCAD: DWG, DXF
- GIS: Shapefile (SHP)
- Data: CSV, LandXML
- Raster: GeoTIFF

## 🎓 Target Users

- Surveyors
- Civil Engineers
- Construction Companies
- Universities
- Government Agencies

## 🔮 Future Enhancements

- Cloud processing version
- Real-time drone data processing
- Flood simulation
- Cut & fill volume calculations
- AR terrain visualization
- Mobile app

## 📝 License

This project is for educational/research purposes.

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

---

**Built with ❤️ for the surveying and mapping community**

