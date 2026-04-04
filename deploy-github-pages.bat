@echo off
setlocal EnableExtensions

cd /d "%~dp0"
title AUTOLP Auto Push

set "REPO_URL=https://github.com/enems141319-hash/AUTOLP.git"
set "BRANCH=main"

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format ''yyyy-MM-dd HH:mm:ss''"') do set "STAMP=%%I"
set "COMMIT_MSG=auto deploy %STAMP%"

echo ==========================================
echo AUTOLP Auto Push
echo Repo: %REPO_URL%
echo Branch: %BRANCH%
echo Commit: %COMMIT_MSG%
echo ==========================================
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Git is not installed.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm is not installed.
  pause
  exit /b 1
)

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
  echo [INFO] Initializing git repository...
  git init
  if errorlevel 1 goto :fail
)

git branch -M %BRANCH%

git remote get-url origin >nul 2>nul
if errorlevel 1 (
  echo [INFO] Setting origin to %REPO_URL%
  git remote add origin %REPO_URL%
) else (
  git remote set-url origin %REPO_URL%
)
if errorlevel 1 goto :fail

echo [STEP] Running tests...
call npm test
if errorlevel 1 (
  echo [ERROR] Tests failed. Push cancelled.
  goto :fail
)

echo [STEP] Building project...
call npm run build
if errorlevel 1 (
  echo [ERROR] Build failed. Push cancelled.
  goto :fail
)

echo [STEP] Staging files...
git add .
if errorlevel 1 goto :fail

git diff --cached --quiet
if not errorlevel 1 (
  echo [INFO] No changes to commit.
  goto :push
)

echo [STEP] Creating commit...
git commit -m "%COMMIT_MSG%"
if errorlevel 1 goto :fail

:push
echo [STEP] Pushing to GitHub...
git push -u origin %BRANCH%
if errorlevel 1 (
  echo [ERROR] Push failed. Check GitHub login or permissions.
  goto :fail
)

echo.
echo [DONE] Push complete.
echo Site:
echo https://enems141319-hash.github.io/AUTOLP/
echo.
pause
exit /b 0

:fail
echo.
echo [FAILED] Auto push did not complete.
echo.
pause
exit /b 1
