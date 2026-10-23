@echo off
title Relay
cd /d "%~dp0"

if /i "%~1"=="stop" (
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\stop-relay.ps1"
    echo.
    pause
    exit /b 0
)

echo.
echo  Opening Relay...
echo.

if exist "dist\index.html" goto :launch

where node >nul 2>nul
if errorlevel 1 goto :needNode

if not exist "node_modules\" (
    echo  First-time setup — installing dependencies...
    echo  This may take a few minutes. Please wait.
    echo.
    call npm install --no-fund --no-audit
    if errorlevel 1 goto :installFailed
)

echo  Preparing the app...
call npm run build
if errorlevel 1 goto :buildFailed

:launch
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\serve-demo.ps1"
exit /b 0

:needNode
echo  Relay could not start because the app files are not included.
echo.
echo  Ask your developer for the small Relay-Client.zip package,
echo  or install Node.js from https://nodejs.org and run this file again.
echo.
pause
exit /b 1

:installFailed
echo.
echo  Setup failed. Check your internet connection and try again.
echo.
pause
exit /b 1

:buildFailed
echo.
echo  Could not prepare Relay. Contact your developer for help.
echo.
pause
exit /b 1
