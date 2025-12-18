'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Upload, 
  Map, 
  Zap, 
  Download, 
  Layers, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Map pattern background */}
      <div className="absolute inset-0 map-background opacity-30"></div>
      
      {/* Navigation */}
      <nav className="relative border-b border-primary-200/50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-map-500 rounded-lg shadow-lg">
                <Map className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-map-600 bg-clip-text text-transparent">TopoAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="px-4 py-2 text-slate-700 hover:text-primary-600 transition-colors font-medium"
              >
                Tableau de bord
              </Link>
              <Link 
                href="/dashboard" 
                className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg transition-all font-medium shadow-lg shadow-primary-500/30"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-map-100 rounded-full mb-8 border border-primary-200/50 shadow-sm">
              <Sparkles className="h-4 w-4 text-primary-600" />
              <span className="text-primary-700 text-sm font-semibold">
                Cartographie topographique alimentée par l'IA
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              Des données brutes aux
              <span className="block bg-gradient-to-r from-primary-600 via-map-600 to-terrain-600 bg-clip-text text-transparent">
                cartes topographiques propres
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
              Automatisez 70 à 80 % de votre travail d'arpentage. Transformez les images de drones et les nuages de points LiDAR 
              en cartes topographiques professionnelles grâce au traitement par IA.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/dashboard"
                className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all font-semibold text-lg flex items-center space-x-2 shadow-xl shadow-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/50 transform hover:-translate-y-0.5"
              >
                <span>Commencer le traitement</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition-all font-semibold text-lg border-2 border-slate-200 hover:border-primary-300 shadow-lg">
                Voir la démo
              </button>
            </div>
          </div>
        </div>

        {/* Map visualization background */}
        <div className="absolute inset-0 -z-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-map-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-terrain-200/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Fonctionnalités puissantes
            </h2>
            <p className="text-xl text-slate-600">
              Tout ce dont vous avez besoin pour la cartographie topographique professionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Upload,
                title: 'Support multi-formats',
                description: 'Traitez les images de drones (JPG/TIFF), LiDAR (.LAS/.LAZ), points GNSS et fichiers GCP',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Zap,
                title: 'Détection de terrain par IA',
                description: 'Détectez automatiquement les collines, vallées, routes, lits de rivières et structures artificielles',
                gradient: 'from-primary-500 to-emerald-500',
              },
              {
                icon: Layers,
                title: 'Génération DEM/DTM/DSM',
                description: 'Générez des modèles numériques d\'élévation avec une résolution personnalisable (5 cm à 50 cm)',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Map,
                title: 'Lignes de contour automatiques',
                description: 'Générez des lignes de contour lisses et étiquetées avec des intervalles définis par l\'utilisateur',
                gradient: 'from-primary-500 to-blue-500',
              },
              {
                icon: TrendingUp,
                title: 'Analyse de pente et d\'orientation',
                description: 'Calculez les cartes de pente, la direction d\'orientation et la visualisation en ombrage',
                gradient: 'from-orange-500 to-red-500',
              },
              {
                icon: Download,
                title: 'Export en un clic',
                description: 'Exportez vers AutoCAD (DWG/DXF), Civil 3D, Shapefile, CSV et LandXML',
                gradient: 'from-green-500 to-emerald-500',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="map-card p-6 rounded-2xl transition-all duration-300 hover:scale-105 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-white to-slate-100 relative">
        <div className="absolute inset-0 contour-lines opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Comment ça fonctionne
            </h2>
            <p className="text-xl text-slate-600">
              Workflow simple, résultats puissants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Télécharger les données', desc: 'Glissez-déposez vos images de drones ou fichiers LiDAR', color: 'from-blue-500 to-cyan-500' },
              { step: '2', title: 'Traitement par IA', desc: 'Suppression automatique du bruit et classification du terrain', color: 'from-primary-500 to-emerald-500' },
              { step: '3', title: 'Générer les cartes', desc: 'Créez des DEM, contours et couches d\'analyse', color: 'from-purple-500 to-pink-500' },
              { step: '4', title: 'Exporter et partager', desc: 'Téléchargez dans votre format préféré', color: 'from-orange-500 to-red-500' },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-500 via-primary-600 to-map-600 relative overflow-hidden">
        <div className="absolute inset-0 map-background opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Prêt à transformer votre workflow ?
          </h2>
          <p className="text-xl text-white/95 mb-8">
            Rejoignez les arpenteurs, ingénieurs et entreprises de construction qui utilisent l'IA pour gagner du temps et améliorer la précision.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            Commencer gratuitement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="p-1.5 bg-gradient-to-br from-primary-500 to-map-500 rounded-lg">
                <Map className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-map-600 bg-clip-text text-transparent">TopoAI</span>
            </div>
            <p className="text-slate-600 text-sm">
              © 2024 TopoAI. Logiciel de cartographie topographique assisté par IA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

