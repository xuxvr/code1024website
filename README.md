# 个人网站

一个现代化的个人网站，展示全栈开发、3D交互和VR/AR技术能力。

## ✨ 特性

- 🎨 **现代化设计** - 采用深色主题和渐变色彩
- 🌟 **3D背景效果** - 使用Three.js创建动态粒子系统
- 📱 **响应式布局** - 完美适配各种设备
- ⚡ **流畅动画** - CSS动画和JavaScript交互效果
- 🎯 **打字机效果** - 动态文字展示
- 📊 **技能可视化** - 动画技能条展示
- 🎮 **3D项目预览** - 每个项目都有独特的3D展示
- 📧 **联系表单** - 带验证的联系表单

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **3D图形**: Three.js
- **动画**: AOS (Animate On Scroll)
- **图标**: Font Awesome
- **字体**: Google Fonts (Inter)
- **托管**: Cloudflare Pages
- **版本控制**: Git/GitHub

## 🚀 快速开始

### 本地开发

1. 克隆项目
```bash
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
```

2. 使用本地服务器运行
```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx serve .

# 或使用PHP
php -S localhost:8000
```

3. 在浏览器中访问 `http://localhost:8000`


## 📁 项目结构

```
portfolio/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 主要JavaScript逻辑
├── three-scene.js      # Three.js 3D场景
├── README.md           # 项目说明
└── assets/             # 资源文件（如需要）
    ├── images/
    └── icons/
```

## 🎨 自定义指南

### 修改个人信息

1. **基本信息**: 编辑 `index.html` 中的文本内容
2. **技能标签**: 修改 `.hero-skills` 部分
3. **联系方式**: 更新 `.contact-methods` 中的信息
4. **项目展示**: 替换 `.project-card` 中的项目信息

### 修改颜色主题

在 `style.css` 中的 `:root` 部分修改CSS变量：

```css
:root {
    --primary-color: #6366f1;    /* 主色调 */
    --secondary-color: #8b5cf6;  /* 次要色调 */
    --accent-color: #06b6d4;     /* 强调色 */
    /* ... 其他颜色变量 */
}
```

### 添加新项目

1. 在HTML中复制 `.project-card` 结构
2. 在 `three-scene.js` 中添加对应的3D预览函数
3. 更新项目信息和链接

### 修改3D效果

- **粒子数量**: 修改 `three-scene.js` 中的 `particleCount`
- **动画速度**: 调整动画函数中的时间参数
- **颜色**: 修改粒子颜色数组

## 📊 性能优化

- 使用CDN加载外部库
- 图片懒加载
- CSS和JavaScript压缩
- 响应式图片
- 浏览器缓存优化

## 🔧 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 联系方式

- 邮箱: admin@code1024.club
- GitHub: [@xuxvr](https://github.com/xuxvr)

## 🙏 致谢

- [Three.js](https://threejs.org/) - 3D图形库
- [AOS](https://michalsnik.github.io/aos/) - 滚动动画库
- [Font Awesome](https://fontawesome.com/) - 图标库
- [Google Fonts](https://fonts.google.com/) - 网页字体

---

⭐ 如果这个项目对您有帮助，请给个Star！ 
