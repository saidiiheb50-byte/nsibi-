'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { 
  Upload, 
  File, 
  Map, 
  Settings, 
  Download,
  Play,
  Loader2,
  CheckCircle2,
  XCircle,
  Layers,
  TrendingUp
} from 'lucide-react'
import MapViewer from '@/components/MapViewer'
import ProcessingPanel from '@/components/ProcessingPanel'
import ExportPanel from '@/components/ExportPanel'

type FileType = {
  id: string
  name: string
  type: string
  size: number
  status: 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
}

export default function Dashboard() {
  const [files, setFiles] = useState<FileType[]>([])
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
  const [processingStep, setProcessingStep] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const fileType = file.name.split('.').pop()?.toLowerCase() || ''
      const newFile: FileType = {
        id: Date.now().toString(),
        name: file.name,
        type: fileType,
        size: file.size,
        status: 'uploading',
        progress: 0,
      }
      
      setFiles((prev) => [...prev, newFile])
      
      // Simulate upload
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === newFile.id
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        )
      }, 200)

      setTimeout(() => {
        clearInterval(interval)
        setFiles((prev) =>
          prev.map((f) =>
            f.id === newFile.id ? { ...f, status: 'completed', progress: 100 } : f
          )
        )
      }, 2000)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.tiff', '.tif'],
      'application/octet-stream': ['.las', '.laz'],
      'text/csv': ['.csv'],
    },
    multiple: true,
  })

  const handleProcess = async () => {
    if (files.length === 0) return
    
    setIsProcessing(true)
    setProcessingStep('Initialisation des modèles IA...')
    
    // Simulate processing steps
    const steps = [
      'Pré-traitement des données...',
      'Exécution de la détection de terrain par IA...',
      'Nettoyage du bruit et des valeurs aberrantes...',
      'Génération du DEM/DTM...',
      'Extraction des lignes de contour...',
      'Calcul de la pente et de l\'orientation...',
      'Finalisation des résultats...',
    ]

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i])
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    setResults({
      dem: { status: 'ready', resolution: '10cm' },
      contours: { status: 'ready', count: 1247, interval: '1m' },
      slope: { status: 'ready' },
      aspect: { status: 'ready' },
    })
    
    setIsProcessing(false)
    setProcessingStep('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative">
      {/* Map pattern background */}
      <div className="absolute inset-0 map-background opacity-20"></div>
      
      {/* Header */}
      <header className="relative border-b border-primary-200/50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-gradient-to-br from-primary-500 to-map-500 rounded-lg shadow-md">
                <Map className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-map-600 bg-clip-text text-transparent">Tableau de bord TopoAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-slate-700 hover:text-primary-600 transition-colors font-medium hover:bg-slate-100 rounded-lg">
                Paramètres
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] relative z-10">
        {/* Left Panel - File Upload */}
        <div className="w-80 border-r border-primary-200/50 bg-white/80 backdrop-blur-md shadow-lg overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-map-500 rounded-full"></span>
              <span>Importation de données</span>
            </h2>
            
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-map-50 shadow-lg scale-105'
                  : 'border-slate-300 hover:border-primary-400 hover:bg-slate-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                isDragActive 
                  ? 'bg-gradient-to-br from-primary-500 to-map-500' 
                  : 'bg-gradient-to-br from-primary-100 to-map-100'
              }`}>
                <Upload className={`h-8 w-8 ${isDragActive ? 'text-white' : 'text-primary-600'}`} />
              </div>
              <p className="text-slate-700 font-semibold mb-2">
                {isDragActive ? 'Déposez les fichiers ici' : 'Glissez-déposez les fichiers'}
              </p>
              <p className="text-sm text-slate-500">
                JPG, TIFF, LAS, LAZ, CSV
              </p>
            </div>

            {/* File List */}
            <div className="mt-6 space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="map-card p-3 rounded-xl cursor-pointer hover:scale-[1.02] transition-all"
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gradient-to-br from-primary-100 to-map-100 rounded-lg">
                        <File className="h-4 w-4 text-primary-600" />
                      </div>
                      <span className="text-sm text-slate-900 font-semibold truncate">
                        {file.name}
                      </span>
                    </div>
                    {file.status === 'completed' && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    {file.status === 'uploading' && (
                      <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />
                    )}
                  </div>
                  {file.status === 'uploading' && (
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-map-500 h-2 rounded-full transition-all shadow-sm"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                  <p className="text-xs text-slate-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>

            {/* Process Button */}
            {files.length > 0 && (
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed text-white rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Traitement en cours...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Commencer le traitement</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Center - Map Viewer */}
        <div className="flex-1 relative">
          <MapViewer data={results} />
          
          {/* Processing Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50">
              <div className="map-card rounded-2xl p-8 border-2 border-primary-200 shadow-2xl max-w-md">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-map-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
                <p className="text-slate-900 text-lg font-bold text-center">
                  {processingStep}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Settings & Export */}
        <div className="w-80 border-l border-primary-200/50 bg-white/80 backdrop-blur-md shadow-lg overflow-y-auto">
          <div className="p-4 space-y-4">
            <ProcessingPanel />
            {results && <ExportPanel results={results} />}
          </div>
        </div>
      </div>
    </div>
  )
}

