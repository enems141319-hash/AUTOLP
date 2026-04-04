@echo off
setlocal EnableExtensions

set "REPO_URL=https://github.com/enems141319-hash/AUTOLP.git"
set "BRANCH=main"
set "COMMIT_MSG=%~1"

if "%COMMIT_MSG%"=="" (
  set "COMMIT_MSG=deploy site"
)

where git >nul 2>nul
if errorlevel 1 (
  echo Git is not installed. Please install Git for Windows first.
  exit /b 1
)

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
  echo Initializing git repository...
  git init
  if errorlevel 1 exit /b 1
)

git branch -M %BRANCH%

git remote get-url origin >nul 2>nul
if errorlevel 1 (
  echo Setting origin to %REPO_URL%
  git remote add origin %REPO_URL%
) else (
  git remote set-url origin %REPO_URL%
)

echo Running tests...
call npm test
if errorlevel 1 (
  echo Tests failed. Fix them before deploy.
  exit /b 1
)

echo Building project...
call npm run build
if errorlevel 1 (
  echo Build failed. Fix the build before deploy.
  exit /b 1
)

echo Adding files...
git add .
if errorlevel 1 exit /b 1

echo Creating commit...
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
  echo No new changes to commit. Continuing with push.
)

echo Pushing to GitHub...
git push -u origin %BRANCH%
if errorlevel 1 (
  echo Push failed. Check your GitHub login or repository permissions.
  exit /b 1
)

echo.
echo Push complete.
echo Next step:
echo 1. Open GitHub repo Settings -^> Pages
echo 2. Set Build and deployment source to GitHub Actions
echo 3. Wait for the workflow to finish
echo Site URL:
echo https://enems141319-hash.github.io/AUTOLP/

exit /b 0
