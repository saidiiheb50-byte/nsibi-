'use client'

import { useState } from 'react'
import { Settings, Layers, TrendingUp } from 'lucide-react'

export default function ProcessingPanel() {
  const [resolution, setResolution] = useState('10')
  const [contourInterval, setContourInterval] = useState('1')
  const [enableSlope, setEnableSlope] = useState(true)
  const [enableAspect, setEnableAspect] = useState(true)

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-1.5 bg-gradient-to-br from-primary-100 to-map-100 rounded-lg">
          <Settings className="h-4 w-4 text-primary-600" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Paramètres de traitement</h2>
      </div>

      {/* DEM Resolution */}
      <div className="map-card rounded-xl p-4">
        <label htmlFor="dem-resolution" className="block text-sm font-semibold text-slate-900 mb-2">
          Résolution DEM
        </label>
        <select
          id="dem-resolution"
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
        >
          <option value="5">5 cm</option>
          <option value="10">10 cm</option>
          <option value="25">25 cm</option>
          <option value="50">50 cm</option>
        </select>
      </div>

      {/* Contour Interval */}
      <div className="map-card rounded-xl p-4">
        <label htmlFor="contour-interval" className="block text-sm font-semibold text-slate-900 mb-2">
          Intervalle de contour
        </label>
        <select
          id="contour-interval"
          value={contourInterval}
          onChange={(e) => setContourInterval(e.target.value)}
          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
        >
          <option value="0.5">0.5 m</option>
          <option value="1">1 m</option>
          <option value="2">2 m</option>
          <option value="5">5 m</option>
        </select>
      </div>

      {/* Analysis Options */}
      <div className="map-card rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Options d'analyse</h3>
        
        <label htmlFor="slope-analysis" className="flex items-center space-x-3 mb-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
          <input
            id="slope-analysis"
            type="checkbox"
            checked={enableSlope}
            onChange={(e) => setEnableSlope(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 border-slate-300"
          />
          <TrendingUp className="h-4 w-4 text-primary-600" />
          <span className="text-sm text-slate-700 font-medium">Analyse de pente</span>
        </label>

        <label htmlFor="aspect-analysis" className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
          <input
            id="aspect-analysis"
            type="checkbox"
            checked={enableAspect}
            onChange={(e) => setEnableAspect(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 border-slate-300"
          />
          <Layers className="h-4 w-4 text-primary-600" />
          <span className="text-sm text-slate-700 font-medium">Analyse d'orientation</span>
        </label>
      </div>

      {/* AI Settings */}
      <div className="map-card rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Traitement par IA</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-r from-primary-50 to-map-50">
            <span className="text-slate-700 font-medium">Suppression du bruit</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Activé</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-r from-primary-50 to-map-50">
            <span className="text-slate-700 font-medium">Classification du sol</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Activé</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-r from-primary-50 to-map-50">
            <span className="text-slate-700 font-medium">Détection de terrain</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Activé</span>
          </div>
        </div>
      </div>
    </div>
  )
}

