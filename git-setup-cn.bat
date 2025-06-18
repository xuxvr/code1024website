@echo off
chcp 936 >nul
echo ================================
echo      Git项目推送助手
echo ================================
echo.

echo 请确保您已经：
echo 1. 安装了Git
echo 2. 在GitHub创建了仓库  
echo 3. 获取了Personal Access Token
echo.

pause

echo 配置Git用户信息...
set /p username="请输入您的GitHub用户名: "
set /p email="请输入您的GitHub邮箱: "

git config --global user.name "%username%"
git config --global user.email "%email%"

echo.
echo 初始化Git仓库...
git init

echo.
echo 添加所有文件...
git add .

echo.
echo 提交文件...
git commit -m "Initial commit: Personal portfolio website with AI and mobile skills"

echo.
set /p repo_url="请输入您的GitHub仓库URL (https://github.com/username/repo.git): "

echo.
echo 添加远程仓库...
git remote add origin %repo_url%

echo.
echo 推送到GitHub...
echo 如果提示输入密码，请输入您的Personal Access Token
git push -u origin main

echo.
echo ================================
echo      推送完成！
echo ================================
echo.
echo 您的网站代码已成功推送到GitHub
echo 现在可以部署到Cloudflare Pages了
echo.
pause 