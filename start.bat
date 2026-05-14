@echo off
cd /d "%~dp0"
title C Mastery

REM Find a Python command (py launcher, python, or python3)
set "PYCMD="
where py      >nul 2>&1 && set "PYCMD=py"
if not defined PYCMD (where python  >nul 2>&1 && set "PYCMD=python")
if not defined PYCMD (where python3 >nul 2>&1 && set "PYCMD=python3")

if not defined PYCMD (
    echo.
    echo   C MASTERY
    echo   ===========
    echo   Python is not installed on this computer.
    echo   The in-browser Run button needs a tiny local server, which uses Python.
    echo.
    echo   Easy fix:
    echo     1. Open the Microsoft Store
    echo     2. Search "Python" and install the latest version (free, ~30 seconds)
    echo     3. Close this window and double-click start.bat again
    echo.
    echo   Continuing anyway -- opening index.html directly in your browser.
    echo   All lessons and projects still work. For running C code, use the
    echo   "Open in OnlineGDB" button inside the playground.
    echo.
    pause
    start "" "index.html"
    exit /b
)

echo.
echo   C MASTERY
echo   ===========
echo   Server starting on:   http://localhost:5173
echo   Browser will open in a moment.
echo.
echo   To STOP the server:   close this window (or press Ctrl+C)
echo.

REM Open the browser shortly after starting the server
start "" "http://localhost:5173"

REM Run the server in the foreground so closing this window stops it
%PYCMD% -m http.server 5173
