<h1 align='center'>🚀 Nuxt3 企业级项目模板</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-3.17.5-00DC82?style=flat&logo=nuxt.js" alt="Nuxt 3">
  <img src="https://img.shields.io/badge/Vue-3.5.16-4FC08D?style=flat&logo=vue.js" alt="Vue 3">
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Element_Plus-Latest-409EFF?style=flat&logo=element" alt="Element Plus">
  <img src="https://img.shields.io/badge/UnoCSS-0.66.1-333333?style=flat&logo=unocss" alt="UnoCSS">
</p>

<p align="center">
  一个功能完整、开箱即用的 Nuxt3 企业级项目模板，集成了现代前端开发的最佳实践
</p>

---

## ✨ 特性

- 🎯 **最新技术栈**: Nuxt 3.17.5 + Vue 3.5 + TypeScript
- 🎨 **UI 组件库**: Element Plus + UnoCSS 原子化CSS
- 🌍 **国际化**: 内置 i18n 多语言支持 (中文/英文)
- 📱 **响应式设计**: 移动端适配，支持多设备
- 🎭 **主题系统**: 动态主题切换，支持自定义颜色
- 🔐 **权限管理**: 完整的用户认证和路由守卫
- 📡 **HTTP 客户端**: 封装的请求库，支持拦截器和错误处理
- 🗂️ **状态管理**: Pinia + 持久化存储
- 🛠️ **开发工具**: ESLint + Prettier + Git Hooks
- 📦 **构建优化**: Vite + 代码分割 + 压缩优化
- 🔍 **SEO 友好**: SSR/SSG 支持，完善的 meta 标签
- 📊 **二维码生成**: 内置美化二维码组件

## 🛠️ 技术栈

### 核心框架
- **[Nuxt 3](https://nuxt.com/)** - 全栈 Vue 框架
- **[Vue 3](https://vuejs.org/)** - 渐进式 JavaScript 框架
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript 的超集

### UI & 样式
- **[Element Plus](https://element-plus.org/)** - Vue 3 组件库
- **[UnoCSS](https://unocss.dev/)** - 即时原子化 CSS 引擎
- **[SCSS](https://sass-lang.com/)** - CSS 预处理器

### 状态管理 & 工具
- **[Pinia](https://pinia.vuejs.org/)** - Vue 状态管理
- **[VueUse](https://vueuse.org/)** - Vue 组合式工具集
- **[Day.js](https://dayjs.gitee.io/)** - 轻量级日期库
- **[Lodash](https://lodash.com/)** - JavaScript 工具库

### 开发工具
- **[ESLint](https://eslint.org/)** - 代码检查工具
- **[Prettier](https://prettier.io/)** - 代码格式化
- **[Simple Git Hooks](https://github.com/toplenboren/simple-git-hooks)** - Git 钩子
- **[Lint Staged](https://github.com/okonet/lint-staged)** - 暂存文件检查

## 📋 环境要求

- **Node.js**: v20.0.0 或更高版本
- **包管理器**: npm / pnpm / yarn / bun

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd nuxt3-template
```

### 2. 安装依赖

```bash
# 推荐使用 pnpm
pnpm install

# 或者使用其他包管理器
npm install
yarn install
bun install
```

### 3. 启动开发服务器

```bash
# 开发环境 (http://localhost:3000)
pnpm dev

# 指定环境启动
pnpm dev:production  # 生产环境配置
pnpm dev:test       # 测试环境配置
```

## 📦 构建部署

### 开发环境构建
```bash
pnpm build:development
```

### 生产环境构建
```bash
pnpm build
```

### 静态站点生成
```bash
# 开发环境
pnpm generate

# 生产环境
pnpm generate:production
```

### 预览构建结果
```bash
pnpm preview
```

### 启动生产服务器
```bash
pnpm start
```

## 🔧 开发工具

### 代码检查
```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix

# 查看 ESLint 配置
pnpm eslint:cfg
```

### 构建分析
```bash
pnpm analyze
```

### 升级 Nuxt
```bash
npx nuxi upgrade --force
```

## 📁 项目结构

```
nuxt3-template/
├── apis/                 # API 接口定义
├── assets/              # 静态资源
│   ├── scss/           # 样式文件
│   └── svgs/           # SVG 图标
├── components/          # Vue 组件
├── composables/         # 组合式函数
├── i18n/               # 国际化配置
├── layouts/            # 布局组件
├── middleware/         # 中间件
├── pages/              # 页面组件
├── plugins/            # 插件
├── public/             # 公共静态文件
├── server/             # 服务端代码
├── stores/             # Pinia 状态管理
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数
├── app.config.ts       # 应用配置
├── nuxt.config.ts      # Nuxt 配置
└── uno.config.ts       # UnoCSS 配置
```

## 🌟 核心功能

### 🎨 主题系统
- 支持动态主题色切换
- Element Plus 主题定制
- 颜色选择器组件

### 🌍 国际化
- 支持中文/英文切换
- 延迟加载语言包
- 浏览器语言自动检测

### 🔐 权限管理
- JWT Token 认证
- 路由守卫
- 用户状态管理

### 📡 HTTP 请求
- 统一的请求封装
- 请求/响应拦截器
- 错误处理机制
- 文件上传支持

### 📱 响应式设计
- 移动端适配
- 多设备支持
- 触摸友好的交互

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- [Nuxt 3 文档](https://nuxt.com/docs)
- [Vue 3 文档](https://vuejs.org/)
- [Element Plus 文档](https://element-plus.org/)
- [UnoCSS 文档](https://unocss.dev/)
- [Pinia 文档](https://pinia.vuejs.org/)

---

<p align="center">
  如果这个项目对你有帮助，请给个 ⭐️ 支持一下！
</p>
