# 🚀 Git推送到GitHub完整指南

## 📋 准备工作清单

### ✅ 1. 安装Git
- 下载：https://git-scm.com/download/win
- 安装时选择默认选项
- 重启命令行窗口

### ✅ 2. 创建GitHub仓库
1. 登录GitHub
2. 点击右上角 "+" → "New repository"
3. 仓库名建议：`portfolio` 或 `personal-website`
4. 选择 Private 或 Public
5. **不要**勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

### ✅ 3. 获取Personal Access Token
1. GitHub → 头像 → Settings
2. 左侧菜单 → Developer settings
3. Personal access tokens → Tokens (classic)
4. Generate new token (classic)
5. 勾选权限：
   - ✅ repo (完整仓库权限)
   - ✅ workflow
   - ✅ write:packages
6. 生成并**立即复制**Token（只显示一次！）

## 🔧 推送方法

### 方法一：使用批处理脚本（推荐）

1. **双击运行** `git-setup.bat`
2. 按提示输入信息
3. 在密码提示时输入您的Personal Access Token

### 方法二：手动命令行

```bash
# 1. 配置用户信息
git config --global user.name "您的GitHub用户名"
git config --global user.email "您的GitHub邮箱"

# 2. 初始化仓库
git init

# 3. 添加文件
git add .

# 4. 提交
git commit -m "Initial commit: Personal portfolio website"

# 5. 添加远程仓库（使用Token）
git remote add origin https://YOUR_TOKEN@github.com/yourusername/your-repo-name.git

# 6. 推送
git push -u origin main
```

## 🚨 常见问题解决

### 问题1：权限被拒绝
**错误信息**：`Permission denied` 或 `Authentication failed`

**解决方案**：
```bash
# 使用Token URL格式
git remote set-url origin https://YOUR_TOKEN@github.com/username/repo.git
```

### 问题2：仓库未找到
**错误信息**：`Repository not found`

**解决方案**：
1. 检查仓库名是否正确
2. 确认仓库是否已创建
3. 检查Token权限

### 问题3：分支名错误
**错误信息**：`src refspec main does not match any`

**解决方案**：
```bash
# 重命名分支为main
git branch -M main
git push -u origin main
```

### 问题4：已存在远程仓库
**错误信息**：`remote origin already exists`

**解决方案**：
```bash
# 删除现有远程仓库
git remote remove origin
# 重新添加
git remote add origin https://YOUR_TOKEN@github.com/username/repo.git
```

## 📱 Token URL格式示例

如果您的信息是：
- GitHub用户名：`john_doe`
- 仓库名：`portfolio`
- Personal Access Token：`ghp_xxxxxxxxxxxx`

那么完整URL是：
```
https://ghp_xxxxxxxxxxxx@github.com/john_doe/portfolio.git
```

## 🎯 推送成功后

1. **验证推送**：访问您的GitHub仓库页面，确认文件已上传
2. **部署到Cloudflare**：
   - 登录Cloudflare Pages
   - 连接GitHub仓库
   - 选择您的项目仓库
   - 部署设置使用默认值
   - 等待部署完成

## 💡 小贴士

- Token只显示一次，请妥善保存
- 私有仓库也可以部署到Cloudflare Pages
- 推送成功后可以删除本地的 `git-setup.bat` 文件
- 建议为不同项目使用不同的Token

## 🆘 需要帮助？

如果仍有问题，请提供具体的错误信息，我会为您提供针对性的解决方案。 