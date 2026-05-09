@echo off
REM Quick Start Script for Turmeric Vision (Windows)
REM This script starts both backend and frontend

echo.
echo ====================================
echo 🌿 Turmeric Vision - Quick Start
echo ====================================
echo.

REM Get computer IP
for /f "tokens=2 delims=: " %%a in ('ipconfig ^| findstr "IPv4 Address"') do (
    if not defined COMPUTER_IP (
        set COMPUTER_IP=%%a
    )
)

echo Your Computer IP: %COMPUTER_IP%
echo.

REM Navigate to backend
echo Starting Backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
pip install -r requirements.txt

REM Check if model exists
if not exist "turmeric_model.h5" (
    echo.
    echo ⚠️  Warning: turmeric_model.h5 not found in backend folder
    echo Please copy your model file to: %cd%\turmeric_model.h5
    pause
)

REM Start backend in new window
start "Turmeric Vision Backend" python app.py
echo Backend started
echo Backend running at: http://0.0.0.0:5000
echo.

REM Wait for backend to start
timeout /t 3 /nobreak

REM Navigate to frontend
cd ..\frontend

REM Update .env file with correct IP
(
    echo REACT_APP_API_URL=http://%COMPUTER_IP%:5000
) > .env

echo Updating frontend with backend IP: %COMPUTER_IP%
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

REM Start frontend
echo.
echo Starting Frontend...
echo.
echo ====================================
echo Ready! Open your phone browser to:
echo http://%COMPUTER_IP%:3000
echo ====================================
echo.

call npm start

pause
