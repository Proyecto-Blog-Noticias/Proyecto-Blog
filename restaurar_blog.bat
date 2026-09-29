@echo off
chcp 65001 > nul
title Restaurador Automático - Blog de Viajes
cls

echo =======================================================
echo          RESTAURADOR AUTOMÁTICO DEL BLOG
echo =======================================================
echo.
echo Este script restaurará la base de datos y las imágenes
echo desde tu carpeta de copias de seguridad.
echo.
echo Ruta origen: C:\Users\Piru\Documents\Develop\Backup_Blog
echo.

set "BACKUP_DIR=C:\Users\Piru\Documents\Develop\Backup_Blog"
set "DEST_BACKEND=C:\Users\Piru\Documents\Develop\Proyecto-Blog\backend"

if not exist "%BACKUP_DIR%" (
    echo [ERROR] No se encontró la carpeta de copias de seguridad en:
    echo %BACKUP_DIR%
    echo Primero debes realizar al menos un respaldo.
    echo.
    pause
    exit /b
)

echo Copias de seguridad disponibles en tu carpeta:
echo -------------------------------------------------------
dir "%BACKUP_DIR%" /b /ad
echo -------------------------------------------------------
echo.

:SOLICITAR_FECHA
set /p "FECHA=Escribe el nombre exacto de la carpeta que deseas restaurar (ej. Backup_2026-09-20): "

if "%FECHA%"=="" (
    echo El nombre no puede estar vacío.
    goto SOLICITAR_FECHA
)

set "RUTA_ORIGEN=%BACKUP_DIR%\%FECHA%"

if not exist "%RUTA_ORIGEN%" (
    echo.
    echo [ERROR] La carpeta "%FECHA%" no existe. 
    echo Asegúrate de escribir el nombre exactamente como aparece arriba.
    echo.
    goto SOLICITAR_FECHA
)

echo.
echo Se va a proceder a restaurar los datos desde:
echo %RUTA_ORIGEN%
echo.
echo [ADVERTENCIA] Esto reemplazará los datos actuales del blog.
set /p "CONFIRM=¿Estás seguro de que deseas continuar? (S/N): "

if /i "%CONFIRM%" neq "S" (
    echo.
    echo Restauración cancelada por el usuario.
    echo.
    pause
    exit /b
)

echo.
echo 1/2 Restaurando base de datos (news.db)...
if exist "%RUTA_ORIGEN%\news.db" (
    copy /y "%RUTA_ORIGEN%\news.db" "%DEST_BACKEND%\news.db" > nul
    echo [OK] Base de datos restaurada con éxito.
) else (
    echo [ALERTA] No se encontró el archivo news.db en la copia de seguridad.
)

echo.
echo 2/2 Restaurando imágenes de los viajes...
if exist "%RUTA_ORIGEN%\imgs" (
    if not exist "%DEST_BACKEND%\imgs" mkdir "%DEST_BACKEND%\imgs"
    xcopy "%RUTA_ORIGEN%\imgs\*" "%DEST_BACKEND%\imgs\" /y /e /q > nul
    echo [OK] Carpeta de imágenes restaurada con éxito.
) else (
    echo [ALERTA] No se encontró la carpeta de imágenes en la copia de seguridad.
)

echo.
echo =======================================================
echo       ¡PROCESO DE RESTAURACIÓN COMPLETADO!
echo =======================================================
echo Ahora puedes arrancar tu blog normalmente.
echo.
pause
