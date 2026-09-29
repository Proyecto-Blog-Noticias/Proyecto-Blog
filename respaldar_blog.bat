@echo off
title Copia de Seguridad - Blog de Viajes
chcp 65001 > nul

echo ======================================================
echo    CREANDO COPIA DE SEGURIDAD DE TU BLOG DE VIAJES    
echo ======================================================
echo.

:: Definir rutas (usando las tuyas originales)
set "ORIGEN_BD=C:\Users\Piru\Documents\Develop\Proyecto-Blog\backend\news.db"
set "ORIGEN_IMGS=C:\Users\Piru\Documents\Develop\Proyecto-Blog\backend\imgs"
set "DESTINO_BACKUP=C:\Users\Piru\Documents\Develop\Proyecto-Blog\Backup_Blog"

:: Crear la carpeta de destino si no existe
if not exist "%DESTINO_BACKUP%" (
    mkdir "%DESTINO_BACKUP%"
)

:: Obtener la fecha en formato YYYY-MM-DD (Evitando problemas de región)
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set "dt=%%I"
set "FECHA=%dt:~0,4%-%dt:~4,2%-%dt:~6,2%"

:: Crear carpeta específica para la copia de hoy
set "CARPETA_HOY=%DESTINO_BACKUP%\Backup_%FECHA%"
if not exist "%CARPETA_HOY%" (
    mkdir "%CARPETA_HOY%"
)

echo [+] Copiando base de datos (news.db)...
if exist "%ORIGEN_BD%" (
    copy /Y "%ORIGEN_BD%" "%CARPETA_HOY%\news.db" > nul
    echo     - Base de datos copiada con éxito.
) else (
    echo [!] ERROR: No se encontró el archivo news.db en la ruta original.
)

echo.
echo [+] Copiando carpeta de imágenes (imgs)...
if exist "%ORIGEN_IMGS%" (
    xcopy "%ORIGEN_IMGS%" "%CARPETA_HOY%\imgs\" /E /I /Y /Q > nul
    echo     - Imágenes copiadas con éxito.
) else (
    echo [!] ERROR: No se encontró la carpeta imgs en la ruta original.
)

echo.
echo ======================================================
echo   ¡PROCESO TERMINADO CON ÉXITO!
echo   Tu copia está en: %CARPETA_HOY%
echo ======================================================
echo.
pause
