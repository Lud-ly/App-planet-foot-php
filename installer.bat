@echo off

set projectName="afpanier_v3"
set envPath="C:\laragon\"
set devPath="C:\Users\Stagiaire\Desktop\afpanier_v3\"
set configFile="config_afpanier_v3_dev.ini"
set hrefName="www"

WHOAMI /GROUPS | FIND "12288" >NUL
SET /A Elevated = 1 - %ERRORLEVEL%
AT > NUL
IF %Elevated% EQU 1 (
    echo -----------------------------------------------
    echo Create symbolics links from your dev directory
    echo -----------------------------------------------

    if not exist %envPath%"files\" (
        mkdir %envPath%"files\"
    )
    if not exist %envPath%"modules\" (
        mkdir %envPath%"modules\"
    )

    MKLINK /D %envPath%"files\"%projectName% %devPath%"DEVS\files"
    MKLINK %envPath%"files\"%configFile% %devPath%"DEVS\files\"%configFile%
    MKLINK /D %envPath%"modules\"%projectName% %devPath%"DEVS\modules"
    MKLINK /D %envPath%%hrefName%"\"%projectName% %devPath%"DEVS\web"
) ELSE (
    echo -----------------------------------------------
    echo /!\ ALERT /!\
    echo -----------------------------------------------
    echo YOU SHOULD RUN THIS INSTALLER WITH ADMIN PRIVILEGES!
    PING 127.0.0.1 > NUL 2>&1
    EXIT /B 5
)

pause
