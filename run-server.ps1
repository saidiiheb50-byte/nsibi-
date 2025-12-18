# Demarrer le serveur TopoAI
Write-Host "Demarrage du serveur TopoAI..." -ForegroundColor Cyan

# Activer venv et demarrer
Set-Location backend
& ..\venv\Scripts\python.exe main.py

