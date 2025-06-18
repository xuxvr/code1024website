@echo off
chcp 65001 >nul
echo ================================
echo      Git Project Push Helper
echo ================================
echo.

echo Please make sure you have:
echo 1. Installed Git
echo 2. Created a GitHub repository
echo 3. Obtained Personal Access Token
echo.

pause

echo Configuring Git user information...
set /p username="Enter your GitHub username: "
set /p email="Enter your GitHub email: "

git config --global user.name "%username%"
git config --global user.email "%email%"

echo.
echo Initializing Git repository...
git init

echo.
echo Adding all files...
git add .

echo.
echo Committing files...
git commit -m "Initial commit: Personal portfolio website with AI and mobile skills"

echo.
set /p repo_url="Enter your GitHub repository URL (https://github.com/username/repo.git): "

echo.
echo Adding remote repository...
git remote add origin %repo_url%

echo.
echo Pushing to GitHub...
echo If prompted for password, enter your Personal Access Token
git push -u origin main

echo.
echo ================================
echo      Push Complete!
echo ================================
echo.
echo Your website code has been successfully pushed to GitHub
echo Now you can deploy it to Cloudflare Pages
echo.
pause 