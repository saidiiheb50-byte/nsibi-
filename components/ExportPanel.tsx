'use client'

import { useState } from 'react'
import { Download, File, CheckCircle2 } from 'lucide-react'

interface ExportPanelProps {
  results: any
}

export default function ExportPanel({ results }: ExportPanelProps) {
  const [exporting, setExporting] = useState<string | null>(null)

  const exportFormats = [
    { name: 'AutoCAD DWG', format: 'dwg', icon: File },
    { name: 'AutoCAD DXF', format: 'dxf', icon: File },
    { name: 'Shapefile', format: 'shp', icon: File },
    { name: 'CSV Points', format: 'csv', icon: File },
    { name: 'LandXML', format: 'xml', icon: File },
  ]

  const handleExport = async (format: string) => {
    setExporting(format)
    // Simulate export
    await new Promise((resolve) => setTimeout(resolve, 2000))
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
        <div className="space-y-2">
          {exportFormats.map((item) => (
            <button
              key={item.format}
              onClick={() => handleExport(item.format)}
              disabled={exporting === item.format}
              className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gradient-to-r hover:from-primary-50 hover:to-map-50 border border-slate-200 hover:border-primary-300 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-gradient-to-br from-primary-100 to-map-100 rounded-lg">
                  <item.icon className="h-4 w-4 text-primary-600" />
                </div>
                <span className="text-sm text-slate-900 font-medium">{item.name}</span>
              </div>
              {exporting === item.format ? (
                <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="h-4 w-4 text-slate-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

