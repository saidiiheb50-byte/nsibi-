# 🚀 Démarrer le Serveur Localhost

## Méthode Simple (Recommandée)

### Option 1 : Script Batch (Windows)
Double-cliquez sur : **`start-server.bat`**

Ou dans PowerShell :
```powershell
.\start-server.bat
```

### Option 2 : Script PowerShell
```powershell
.\start-server.ps1
```

### Option 3 : Commande Manuelle

**Terminal 1 - Backend :**
```powershell
# Activer l'environnement virtuel
.\venv\Scripts\Activate.ps1

# Aller dans le dossier backend
cd backend

# Démarrer le serveur
python main.py
```

Le serveur sera disponible sur : **http://localhost:8000**

## URLs Disponibles

Une fois le serveur démarré :

- **API Root** : http://localhost:8000
- **Health Check** : http://localhost:8000/api/health
- **Documentation API** : http://localhost:8000/docs
- **Interface Interactive** : http://localhost:8000/redoc

## Vérifier que le Serveur Fonctionne

Ouvrez votre navigateur et allez sur :
```
http://localhost:8000/api/health
```

Vous devriez voir :
```json
{"status": "healthy"}
```

## Démarrer le Frontend (Terminal 2)

Dans un **nouveau terminal** :

```powershell
# Installer les dépendances (première fois seulement)
npm install

# Démarrer le frontend
npm run dev
```

Le frontend sera sur : **http://localhost:3000**

## Arrêter le Serveur

Appuyez sur **Ctrl+C** dans le terminal où le serveur tourne.

## Dépannage

### Erreur : "Module not found"
```powershell
.\venv\Scripts\Activate.ps1
python -m pip install fastapi uvicorn
```

### Erreur : "Port already in use"
Le port 8000 est peut-être déjà utilisé. Changez le port dans `backend/main.py` :
```python
uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
```

### Vérifier les processus Python
```powershell
Get-Process python
```



