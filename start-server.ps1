# Script pour demarrer le serveur TopoAI
Write-Host "=== Demarrage du serveur TopoAI ===" -ForegroundColor Cyan
Write-Host ""

# Activer l'environnement virtuel
Write-Host "Activation de l'environnement virtuel..." -ForegroundColor Yellow
& .\venv\Scripts\python.exe -m pip list | Select-String "fastapi" | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERREUR] FastAPI n'est pas installe dans le venv" -ForegroundColor Red
    Write-Host "Executez d'abord: .\install-backend.ps1" -ForegroundColor Yellow
    exit 1
}

# Aller dans le dossier backend
Set-Location backend

# Demarrer le serveur
Write-Host "Demarrage du serveur sur http://localhost:8000" -ForegroundColor Green
Write-Host "Appuyez sur Ctrl+C pour arreter le serveur" -ForegroundColor Gray
Write-Host ""

& ..\venv\Scripts\python.exe main.py



