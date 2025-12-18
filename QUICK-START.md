# Guide de Démarrage Rapide - TopoAI

## ✅ Installation Complétée

Python 3.14.2 est installé et les packages essentiels sont installés !

## 🚀 Démarrer l'Application

### 1. Démarrer le Backend (Terminal 1)

```powershell
# Activer l'environnement virtuel
.\venv\Scripts\Activate.ps1

# Aller dans le dossier backend
cd backend

# Démarrer le serveur
python main.py
```

Le backend sera disponible sur : **http://localhost:8000**

### 2. Démarrer le Frontend (Terminal 2)

Ouvrez un **nouveau terminal** dans le dossier racine :

```powershell
# Installer les dépendances Node.js (si pas déjà fait)
npm install

# Démarrer le serveur de développement
npm run dev
```

Le frontend sera disponible sur : **http://localhost:3000**

## 📦 Packages Installés

✅ FastAPI - Framework web
✅ Uvicorn - Serveur ASGI
✅ NumPy - Calculs numériques
✅ SciPy - Calculs scientifiques
✅ scikit-learn - Machine Learning
✅ Matplotlib - Visualisation
✅ Pillow - Traitement d'images
✅ Autres utilitaires

## ⚠️ Packages Optionnels (Non Installés)

Ces packages nécessitent une installation spéciale ou un compilateur C++ :

- **GDAL** - Nécessite une installation spéciale sur Windows
- **rasterio** - Dépend de GDAL
- **geopandas** - Dépend de GDAL
- **laspy** - Peut nécessiter une compilation
- **scikit-image** - Nécessite un compilateur C++

### Installer les packages optionnels plus tard :

```powershell
.\venv\Scripts\Activate.ps1

# Pour rasterio (si GDAL est installé)
python -m pip install rasterio

# Pour laspy
python -m pip install laspy

# Pour scikit-image (nécessite Visual Studio Build Tools)
python -m pip install scikit-image
```

## 🧪 Tester l'API

Une fois le backend démarré, testez :

- **Documentation API** : http://localhost:8000/docs
- **Health Check** : http://localhost:8000/api/health

## 🎯 Prochaines Étapes

1. ✅ Backend installé et prêt
2. ⏳ Installer les dépendances frontend : `npm install`
3. ⏳ Démarrer le frontend : `npm run dev`
4. ⏳ Ouvrir http://localhost:3000 dans votre navigateur

## 💡 Astuce

Si vous rencontrez des erreurs d'import dans le backend, certains modules peuvent être manquants. Le backend fonctionnera en mode simplifié sans les packages optionnels.



