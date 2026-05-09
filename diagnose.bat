@echo off
REM Diagnostic script to troubleshoot backend connection issues

echo.
echo ====================================
echo 🔍 Turmeric Vision - Diagnostics
echo ====================================
echo.

REM Check if backend is running
echo [1] Checking if Flask backend is running...
netstat -ano | findstr :5000 > nul
if %errorlevel% equ 0 (
    echo ✅ Backend is running on port 5000
) else (
    echo ❌ Backend is NOT running on port 5000
    echo Start backend with: python app.py
    pause
    exit /b
)

echo.
echo [2] Testing backend health check...
curl -s http://localhost:5000/health > nul
if %errorlevel% equ 0 (
    echo ✅ Backend health check successful
) else (
    echo ❌ Backend health check failed
    echo Make sure model file turmeric_model.h5 exists
)

echo.
echo [3] Getting your computer IP addresses...
echo Your available IP addresses:
ipconfig | findstr "IPv4 Address"

echo.
echo [4] Firewall check...
echo Make sure Windows Firewall allows:
echo    - Port 5000 (Backend)
echo    - Port 3000 (Frontend)
echo.
echo To add firewall rules:
echo   1. Go to Settings > Windows Firewall > Allow an app through firewall
echo   2. Add "python.exe" for backend
echo   3. Add "node.exe" for frontend

echo.
echo [5] Network troubleshooting...
echo.
echo Your computer's network info:
ipconfig | findstr /A:0E "Connection"
echo.

pause
