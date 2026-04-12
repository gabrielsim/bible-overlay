@echo off
title Bible Overlay Setup
color 0A
echo.
echo  ============================================
echo    Bible Overlay - KJV (Offline)
echo  ============================================
echo.

:: Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Node.js is not installed.
    echo.
    echo  Please download and install Node.js from:
    echo    https://nodejs.org  (choose the LTS version)
    echo.
    echo  After installing Node.js, run this file again.
    pause
    exit /b 1
)

echo  [OK] Node.js found
echo.

:: Install dependencies if needed
if not exist "node_modules\electron" (
    echo  Installing Electron (first-time setup, may take a minute)...
    echo.
    npm install
    if errorlevel 1 (
        echo.
        echo  [ERROR] Installation failed. Check your internet connection.
        pause
        exit /b 1
    )
    echo.
    echo  [OK] Installation complete
) else (
    echo  [OK] Dependencies already installed
)

echo.
echo  Launching Bible Overlay...
echo.
npm start
