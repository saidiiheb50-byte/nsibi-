@echo off
title TopoAI Server - Localhost:8000
color 0A
echo.
echo ========================================
echo   TOPOAI SERVER - LOCALHOST:8000
echo ========================================
echo.
echo Demarrage du serveur...
echo.
echo URLs disponibles:
echo   - http://localhost:8000
echo   - http://localhost:8000/docs
echo   - http://localhost:8000/api/health
echo.
echo Appuyez sur Ctrl+C pour arreter
echo.
echo ========================================
echo.

cd backend
..\venv\Scripts\python.exe main.py

pause

