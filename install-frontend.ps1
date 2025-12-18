# Script d'installation pour le frontend TopoAI
# Executez ce script dans PowerShell : .\install-frontend.ps1

Write-Host "=== Installation du Frontend TopoAI ===" -ForegroundColor Cyan

# Verifier Node.js
Write-Host "`nVerification de Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js trouve : $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] Node.js n'est pas installe" -ForegroundColor Red
    Write-Host "Veuillez installer Node.js depuis https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verifier npm
Write-Host "`nVerification de npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "[OK] npm trouve : $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] npm n'est pas disponible" -ForegroundColor Red
    exit 1
}

# Installer les dependances
Write-Host "`nInstallation des dependances Node.js..." -ForegroundColor Yellow
Write-Host "Cela peut prendre quelques minutes..." -ForegroundColor Gray

try {
    npm install
    Write-Host "[OK] Toutes les dependances sont installees!" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] Erreur lors de l'installation des dependances" -ForegroundColor Red
    exit 1
}

Write-Host "`n=== Installation terminee avec succes! ===" -ForegroundColor Green
Write-Host "`nPour demarrer le frontend, executez :" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
