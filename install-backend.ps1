# Script d'installation pour le backend TopoAI
# Executez ce script dans PowerShell : .\install-backend.ps1

Write-Host "=== Installation du Backend TopoAI ===" -ForegroundColor Cyan

# Verifier Python
Write-Host "`nVerification de Python..." -ForegroundColor Yellow
$pythonCheck = python --version 2>&1
if ($LASTEXITCODE -eq 0 -and $pythonCheck -notmatch "introuvable|not found|not recognized") {
    Write-Host "[OK] Python trouve : $pythonCheck" -ForegroundColor Green
} else {
    Write-Host "[ERREUR] Python n'est pas installe ou pas dans le PATH" -ForegroundColor Red
    Write-Host "Veuillez installer Python depuis https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "N'oubliez pas de cocher 'Add Python to PATH' pendant l'installation!" -ForegroundColor Yellow
    Write-Host "`nOu installez depuis le Microsoft Store :" -ForegroundColor Yellow
    Write-Host "  winget install Python.Python.3.11" -ForegroundColor Cyan
    exit 1
}

# Creer l'environnement virtuel
Write-Host "`nCreation de l'environnement virtuel..." -ForegroundColor Yellow
if (Test-Path "venv") {
    Write-Host "[OK] L'environnement virtuel existe deja" -ForegroundColor Green
} else {
    python -m venv venv
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Environnement virtuel cree" -ForegroundColor Green
    } else {
        Write-Host "[ERREUR] Impossible de creer l'environnement virtuel" -ForegroundColor Red
        exit 1
    }
}

# Activer l'environnement virtuel
Write-Host "`nActivation de l'environnement virtuel..." -ForegroundColor Yellow
try {
    & .\venv\Scripts\Activate.ps1
    Write-Host "[OK] Environnement virtuel active" -ForegroundColor Green
} catch {
    Write-Host "[ATTENTION] Erreur d'activation. Essayez d'executer :" -ForegroundColor Yellow
    Write-Host "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Cyan
    Write-Host "Puis reessayez ce script." -ForegroundColor Yellow
    exit 1
}

# Mettre a jour pip
Write-Host "`nMise a jour de pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip
Write-Host "[OK] pip mis a jour" -ForegroundColor Green

# Installer les dependances
Write-Host "`nInstallation des dependances Python..." -ForegroundColor Yellow
Write-Host "Cela peut prendre plusieurs minutes..." -ForegroundColor Gray

try {
    python -m pip install -r requirements.txt
    Write-Host "[OK] Toutes les dependances sont installees!" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] Erreur lors de l'installation des dependances" -ForegroundColor Red
    Write-Host "Certaines dependances (comme GDAL) peuvent necessiter une installation manuelle." -ForegroundColor Yellow
    Write-Host "Consultez INSTALL.md pour plus d'informations." -ForegroundColor Yellow
    exit 1
}

Write-Host "`n=== Installation terminee avec succes! ===" -ForegroundColor Green
Write-Host "`nPour demarrer le backend, executez :" -ForegroundColor Cyan
Write-Host "  .\venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  python main.py" -ForegroundColor White
