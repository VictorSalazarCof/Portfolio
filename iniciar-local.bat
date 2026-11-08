@echo off
title Portfolio - servidor local
cd /d "%~dp0"
where node >nul 2>nul || (echo No se encontro Node.js. Instala la version LTS desde https://nodejs.org y vuelve a ejecutar este archivo. & pause & exit /b 1)
if not exist node_modules (echo Instalando dependencias, solo la primera vez... & call npm install || (pause & exit /b 1))
echo.
echo Abre http://localhost:4321/Portfolio/ en el navegador. Para detener: Ctrl+C
call npm run dev -- --open
pause
