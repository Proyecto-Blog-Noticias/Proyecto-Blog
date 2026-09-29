@echo off
title Lanzador de Blog de Viajes
echo ===================================================
echo   INICIANDO SERVIDORES DE BLOG DE VIAJES
echo ===================================================
echo.
echo [1/2] Abriendo ventana para el BACKEND (Puerto 4000)...
start "Backend - Blog de Viajes" cmd /k "cd /d C:\Users\Piru\Documents\Develop\Proyecto-Blog\backend && npm start"

echo [2/2] Abriendo ventana para el FRONTEND (Puerto 3000)...
start "Frontend - Blog de Viajes" cmd /k "cd /d C:\Users\Piru\Documents\Develop\Proyecto-Blog\frontend\blog && npm start"

echo.
echo ===================================================
echo   ¡Todo listo! No cierres las ventanas que se han 
echo   abierto. Abre tu navegador en http://localhost:3000
echo ===================================================
timeout /t 5
