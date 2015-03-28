:: Setup
:: -----

SET ARTIFACTS=%~dp0%..\artifacts

IF NOT DEFINED DEPLOYMENT_SOURCE (
  SET DEPLOYMENT_SOURCE=%~dp0%.
)

IF NOT DEFINED DEPLOYMENT_TARGET (
  SET DEPLOYMENT_TARGET=%ARTIFACTS%\wwwroot
)


:: Deployment
:: ----------

:: 4. Bower Install
if EXIST "%DEPLOYMENT_TARGET%\bower.json" (
    pushd "%DEPLOYMENT_TARGET%"
    call :ExecuteCmd bower install
    IF !ERRORLEVEL! NEQ 0 goto error
    popd
)