# Guide d'Installation - TopoAI

## Prérequis

### 1. Installer Python (Windows)

**Option A : Installation depuis python.org (Recommandé)**

1. Téléchargez Python 3.10 ou supérieur depuis [python.org](https://www.python.org/downloads/)
2. **IMPORTANT** : Cochez la case "Add Python to PATH" pendant l'installation
3. Cliquez sur "Install Now"

**Option B : Installation depuis Microsoft Store**

1. Ouvrez le Microsoft Store
2. Recherchez "Python 3.11" ou "Python 3.12"
3. Cliquez sur "Installer"

**Vérifier l'installation :**

Ouvrez PowerShell et exécutez :
```powershell
python --version
```

Vous devriez voir quelque chose comme : `Python 3.11.x`

### 2. Installer Node.js

1. Téléchargez Node.js depuis [nodejs.org](https://nodejs.org/)
2. Installez la version LTS (Long Term Support)
3. Vérifiez l'installation :
```powershell
node --version
npm --version
```

## Installation du Projet

### Étape 1 : Installer les dépendances Python

Ouvrez PowerShell dans le dossier du projet et exécutez :

```powershell
# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement virtuel
.\venv\Scripts\Activate.ps1

# Si vous obtenez une erreur d'exécution de script, exécutez d'abord :
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Installer les dépendances
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### Étape 2 : Installer les dépendances Node.js

```powershell
npm install
```

## Démarrer l'Application

### Terminal 1 - Backend (API)

```powershell
# Activer l'environnement virtuel (si pas déjà fait)
.\venv\Scripts\Activate.ps1

# Aller dans le dossier backend
cd backend

# Démarrer le serveur
python main.py
```

Le backend sera disponible sur : `http://localhost:8000`

### Terminal 2 - Frontend

```powershell
# Depuis le dossier racine
npm run dev
```

Le frontend sera disponible sur : `http://localhost:3000`

## Dépannage

### Erreur : "pip n'est pas reconnu"

**Solution :** Utilisez `python -m pip` au lieu de `pip`

```powershell
python -m pip install -r requirements.txt
```

### Erreur : "ExecutionPolicy"

Si vous obtenez une erreur lors de l'activation du venv :

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Puis réessayez :
```powershell
.\venv\Scripts\Activate.ps1
```

### Erreur : GDAL non installé

GDAL peut être difficile à installer sur Windows. Options :

**Option 1 : Utiliser conda (Recommandé pour GDAL)**
```powershell
# Installer Miniconda depuis https://docs.conda.io/en/latest/miniconda.html
conda install -c conda-forge gdal
```

**Option 2 : Installer depuis wheel**
```powershell
# Télécharger le wheel approprié depuis https://www.lfd.uci.edu/~gohlke/pythonlibs/#gdal
python -m pip install GDAL-3.x.x-cp3xx-cp3xx-win_amd64.whl
```

**Option 3 : Pour le développement, vous pouvez commenter GDAL temporairement**

### Erreur : Port déjà utilisé

Si le port 3000 ou 8000 est déjà utilisé :

**Backend :** Modifiez le port dans `backend/main.py` :
```python
uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
```

**Frontend :** Utilisez un autre port :
```powershell
npm run dev -- -p 3001
```

## Structure des Dossiers

```
topo/
├── app/              # Frontend Next.js
├── components/        # Composants React
├── backend/          # Backend FastAPI
│   ├── api/         # Routes et services
│   └── main.py      # Point d'entrée
├── venv/            # Environnement virtuel Python (créé après installation)
├── node_modules/    # Dépendances Node.js (créé après npm install)
└── requirements.txt # Dépendances Python
```

## Prochaines Étapes

1. ✅ Installer Python et Node.js
2. ✅ Installer les dépendances
3. ✅ Démarrer le backend et le frontend
4. 🎯 Ouvrir http://localhost:3000 dans votre navigateur
5. 🎯 Télécharger des données de test (drone images ou LiDAR)
6. 🎯 Commencer à utiliser l'application !

## Support

Si vous rencontrez des problèmes, vérifiez :
- Python version >= 3.10
- Node.js version >= 18
- Tous les ports sont disponibles
- Les chemins sont corrects



