'use client'

import { useState } from 'react'
import { Download, File, CheckCircle2 } from 'lucide-react'

interface ExportPanelProps {
  results: any
}

export default function ExportPanel({ results }: ExportPanelProps) {
  const [exporting, setExporting] = useState<string | null>(null)

  const exportFormats = [
    { name: 'Plan PDF', format: 'pdf', icon: FileText, color: 'from-red-500 to-pink-500', priority: true, description: 'Plan détaillé avec statistiques' },
    { name: 'AutoCAD DWG', format: 'dwg', icon: MapPin, color: 'from-blue-500 to-cyan-500', priority: true, description: 'Fichier AutoCAD' },
    { name: 'AutoCAD DXF', format: 'dxf', icon: File, color: 'from-blue-400 to-blue-600', description: 'Format DXF' },
    { name: 'Shapefile', format: 'shp', icon: File, color: 'from-green-500 to-emerald-500', description: 'Format GIS' },
    { name: 'CSV Points', format: 'csv', icon: File, color: 'from-slate-500 to-slate-700', description: 'Données brutes' },
    { name: 'LandXML', format: 'xml', icon: File, color: 'from-purple-500 to-purple-700', description: 'Format LandXML' },
  ]

  const handleExport = async (format: string) => {
    console.log('Exporting format:', format)
    setExporting(format)
    
    try {
      // Call backend API
      const fileId = results?.fileId || 'default'
      const response = await fetch(`http://localhost:8000/api/export/${format}/${fileId}`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${fileId}_${format === 'pdf' ? 'plan' : 'contours'}.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        console.log('Export successful:', format)
      } else {
        console.error('Export failed:', response.statusText)
        // Fallback to simulated export for demo
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    } catch (error) {
      console.error('Export error:', error)
      // Fallback to simulated export for demo
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
    
    setExporting(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-1.5 bg-gradient-to-br from-primary-100 to-map-100 rounded-lg">
          <Download className="h-4 w-4 text-primary-600" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Exporter les résultats</h2>
      </div>

      {/* Results Summary */}
      <div className="map-card rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Traitement terminé</h3>
        <div className="space-y-2">
          {results.dem && (
            <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-slate-50">
              <span className="text-slate-700 font-medium">DEM</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          )}
          {results.contours && (
            <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-slate-50">
              <span className="text-slate-700 font-medium">Contours ({results.contours.count})</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          )}
          {results.slope && (
            <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-slate-50">
              <span className="text-slate-700 font-medium">Analyse de pente</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          )}
          {results.aspect && (
            <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-slate-50">
              <span className="text-slate-700 font-medium">Analyse d'orientation</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          )}
        </div>
      </div>

      {/* Export Options */}
      <div className="map-card rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Formats d'export</h3>
        <div className="space-y-3">
          {exportFormats.map((item) => (
            <button
              key={item.format}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleExport(item.format)
              }}
              disabled={exporting === item.format}
              className={`w-full flex flex-col items-start px-4 py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] ${
                item.priority
                  ? `bg-gradient-to-r ${item.color || 'from-primary-500 to-primary-600'} text-white hover:shadow-xl border-2 border-transparent hover:border-white/30`
                  : 'bg-white hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg'
              }`}
            >
              <div className="w-full flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-lg ${
                    item.priority 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-gradient-to-br from-primary-100 to-map-100'
                  }`}>
                    <item.icon className={`h-5 w-5 ${
                      item.priority ? 'text-white' : 'text-primary-600'
                    }`} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className={`text-sm font-bold ${
                      item.priority ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item.name}
                    </span>
                    {item.description && (
                      <span className={`text-xs mt-0.5 ${
                        item.priority ? 'text-white/80' : 'text-slate-500'
                      }`}>
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
                {exporting === item.format ? (
                  <div className={`w-5 h-5 border-2 ${
                    item.priority 
                      ? 'border-white border-t-transparent' 
                      : 'border-primary-500 border-t-transparent'
                  } rounded-full animate-spin`} />
                ) : (
                  <Download className={`h-5 w-5 ${
                    item.priority ? 'text-white/80' : 'text-slate-400'
                  }`} />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

