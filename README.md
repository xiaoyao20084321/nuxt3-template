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

## 👋 项目介绍

这是一个基于 **Nuxt 3** 的现代化前端项目模板，特别适合：

- 🔰 **前端新手**: 开箱即用，无需复杂配置
- 🏢 **企业项目**: 完整的权限管理和用户认证系统
- 🚀 **快速开发**: 集成了常用功能和最佳实践
- 📱 **全端适配**: 支持桌面端和移动端

### 🎯 适用场景
- 管理后台系统
- 企业官网
- 用户中心
- 内容管理系统
- 任何需要用户登录和权限控制的 Web 应用

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
- **包管理器**: pnpm (推荐)

> 💡 **新手提示**: 如果你还没有安装 pnpm，可以通过以下命令安装：
> ```bash
> npm install -g pnpm
> ```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/xiaoyao20084321/nuxt3-template.git
cd nuxt3-template
```

### 2. 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install

# 如果出现构建脚本警告，运行以下命令批准
pnpm approve-builds
```

### 3. 环境配置

项目支持多环境配置，你可以根据需要创建对应的环境文件：

```bash
# 开发环境配置文件 (可选)
.env.development

# 生产环境配置文件 (可选)
.env.production

# 测试环境配置文件 (可选)
.env.test
```

**环境变量示例**：
```bash
# API 配置
NUXT_PUBLIC_API_BASE_PREFIX="/dev-api"
NUXT_PUBLIC_API_BASE_URL="http://localhost:8080"
NUXT_PUBLIC_PREVIEW_BASE_URL="http://localhost:8080"

# 开发配置
NUXT_PUBLIC_DELETE_CONSOLE=false
```

> 💡 **新手提示**: 环境文件是可选的，项目可以直接运行。如果需要连接后端 API，请根据上述示例配置相应的环境变量。

### 4. 启动开发服务器

```bash
# 开发环境 (默认端口 3000，如果被占用会自动使用其他端口)
pnpm dev

# 指定环境启动
pnpm dev:production  # 生产环境配置
pnpm dev:test       # 测试环境配置
```

🎉 **恭喜！** 项目启动成功后，你可以：
- 打开浏览器访问显示的地址（通常是 http://localhost:3000）
- 使用测试账号登录体验权限功能：
  - **管理员**: admin / 123456
  - **普通用户**: user / 123456

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
pnpm dlx nuxi upgrade --force
```

### 批准构建脚本
```bash
# 首次安装后可能需要批准构建脚本
pnpm approve-builds
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

## 🔐 权限控制系统

本项目实现了完整的权限控制系统，包括路由拦截、权限控制、用户信息保存、AccessToken过期刷新和按钮权限控制。

### 功能特性

#### 1. 路由拦截/权限控制
- ✅ 全局路由中间件自动拦截所有路由
- ✅ 支持页面级权限配置 (`auth` 和 `permissions`)
- ✅ 自动重定向到登录页面
- ✅ 支持登录后重定向到原页面
- ✅ 支持403权限不足错误页面

#### 2. 用户信息保存
- ✅ 使用 Pinia Store 管理用户状态
- ✅ 自动持久化到本地存储 (pinia-plugin-persistedstate)
- ✅ 支持用户信息、权限、VIP状态、按钮权限等
- ✅ 响应式用户状态管理

#### 3. AccessToken过期刷新
- ✅ 无感知自动刷新机制
- ✅ 请求队列管理，避免重复刷新
- ✅ 失败请求自动重试
- ✅ 刷新失败自动跳转登录页
- ✅ 支持并发请求的token刷新

#### 4. 按钮权限控制
- ✅ 权限指令 `v-permission` / `v-perms`
- ✅ 编程式权限检查函数 `hasPermission`
- ✅ 全局权限检查方法
- ✅ 权限不足时自动隐藏按钮

### 测试账号

- **VIP用户**: admin / 123456 (拥有VIP权限和所有高级功能)
- **普通用户**: user / 123456 (基础权限，部分高级功能)

### 测试页面

- `/` - 首页 (无权限要求)
- `/login` - 登录页面
- `/user` - 用户页面 (需要登录)
- `/admin` - VIP专享页面 (需要VIP权限)
- `/permission-test` - 权限测试页面 (演示按钮权限和API调用)

### 页面权限配置

在页面中使用 `definePageMeta` 配置权限：

```vue
<script setup>
// 需要登录的页面
definePageMeta({
  auth: true, // 需要登录
  permissions: ['logined'], // 需要的权限
  title: '用户页面',
  description: '登录用户可访问的页面',
})

// 需要VIP权限的页面
definePageMeta({
  auth: true,
  permissions: ['logined', 'vip'], // 需要登录且为VIP
  title: 'VIP专享页面',
  description: '仅VIP用户可访问的高级功能页面',
})

// 不需要权限的页面（如登录页）
definePageMeta({
  auth: false, // 明确不需要认证
  layout: false, // 可选：不使用默认布局
})
</script>
```

### 按钮权限控制

#### 使用权限指令

```vue
<template>
  <!-- 使用 v-permission 指令 -->
  <el-button v-permission="['operation:user:create']" type="primary">
    高级功能A (需要 operation:user:create 权限)
  </el-button>

  <!-- 使用 v-perms 指令（简写） -->
  <el-button v-perms="['operation:user:update']" type="warning">
    高级功能B (需要 operation:user:update 权限)
  </el-button>

  <!-- 支持多个权限（需要同时拥有所有权限） -->
  <el-button v-permission="['operation:user:create', 'operation:user:update']">
    高级管理功能
  </el-button>
</template>
```

#### 编程式权限检查

```vue
<script setup>
const { hasPermission, userBtnPermissions } = usePermission()

// 检查单个权限
const canCreate = hasPermission(['operation:user:create'])

// 检查多个权限
const canManage = hasPermission(['operation:user:create', 'operation:user:update'])

// 获取用户所有按钮权限
console.log('用户按钮权限:', userBtnPermissions.value)
</script>

<template>
  <el-button v-if="canCreate" type="primary">
    创建用户
  </el-button>

  <div v-if="canManage" class="admin-panel">
    管理员面板
  </div>
</template>
```

### 认证相关操作

```vue
<script setup>
const userStore = useUserStore()
const { login, logout, isLoggedIn } = useAuth()

// 登录
try {
  await login({ username: 'admin', password: '123456' })
  ElMessage.success('登录成功')
}
catch (error) {
  ElMessage.error('登录失败，请重试')
}

// 退出登录
await logout()

// 检查登录状态
console.log('是否已登录:', isLoggedIn.value)

// 获取用户信息
console.log('用户信息:', userStore.userInfo)
</script>
```

### HTTP请求和Token刷新

```vue
<script setup>
// 自动处理token刷新的HTTP请求
try {
  const response = await useHttp.get('/test/protected')
  console.log('请求成功:', response)
}
catch (error) {
  console.error('请求失败:', error)
}

// POST请求示例
const loginResponse = await useHttp.post('/auth/login', {
  username: 'admin',
  password: '123456',
})

// 如果token过期，会自动刷新并重试请求
// 无需手动处理token刷新逻辑
</script>
```

### 权限类型说明

#### 页面权限
- `logined` - 已登录权限
- `vip` - VIP用户权限

#### 按钮权限
- `operation:user:create` - 创建用户权限
- `operation:user:update` - 更新用户权限
- `operation:user:delete` - 删除用户权限
- `operation:admin:manage` - 管理员操作权限

### 文件结构

```
nuxt3-template/
├── stores/
│   └── user.ts                 # 用户状态管理 (Pinia Store)
├── hooks/                      # 组合式函数
│   ├── useAuth.ts             # 认证相关组合式函数
│   ├── usePermission.ts       # 权限相关组合式函数
│   └── useHttp.ts             # HTTP客户端(含token刷新)
├── middleware/
│   └── token.global.ts        # 全局路由权限中间件
├── plugins/
│   └── permission.client.ts   # 权限指令插件
├── utils/
│   └── permission.ts          # 权限工具函数
├── apis/
│   └── user.ts                # 用户和认证相关API
└── pages/
    ├── index.vue              # 首页
    ├── login.vue              # 登录页面
    ├── user.vue               # 用户页面 (需要登录)
    ├── admin.vue              # VIP专享页面 (需要VIP权限)
    └── permission-test.vue    # 权限测试页面
```

### 核心实现说明

#### 1. 用户状态管理 (`stores/user.ts`)
- 使用 Pinia Store 管理用户状态
- 支持持久化存储 (pinia-plugin-persistedstate)
- 提供计算属性：`getUserPermissionKeys`、`getUserBtnPermission`、`isLoggedIn`

#### 2. 路由权限中间件 (`middleware/token.global.ts`)
- 全局路由拦截，检查页面权限
- 支持 `auth` 和 `permissions` 配置
- 自动重定向到登录页面
- 权限不足时显示403错误

#### 3. HTTP客户端 (`hooks/useHttp.ts`)
- 基于 `$fetch` 封装
- 自动添加 Authorization 头
- 无感知token刷新机制
- 请求队列管理，避免重复刷新

#### 4. 权限指令 (`plugins/permission.client.ts`)
- 注册 `v-permission` 和 `v-perms` 指令
- 权限不足时自动隐藏元素
- 支持单个或多个权限检查

### 注意事项

1. **权限配置**: 页面权限在 `definePageMeta` 中配置，按钮权限通过用户的 `userBtnPermission` 数组控制
2. **Token刷新**: HTTP客户端会自动处理token过期，支持并发请求的token刷新
3. **权限指令**: 没有权限的按钮会被隐藏，不是禁用
4. **持久化**: 用户信息会自动保存到本地存储，刷新页面后仍然有效
5. **服务端渲染**: 权限检查在客户端进行，避免服务端渲染时的水合不匹配
6. **错误处理**: 权限不足时显示403错误页面，Token刷新失败时自动跳转登录页

## ❓ 常见问题

### Q: 如何修改 API 接口地址？
A: 在对应的环境变量文件中配置：
```bash
# .env.development (开发环境)
NUXT_PUBLIC_API_BASE_PREFIX="/dev-api"
NUXT_PUBLIC_API_BASE_URL="http://localhost:8080"
NUXT_PUBLIC_PREVIEW_BASE_URL="http://localhost:8080"

# .env.production (生产环境)
NUXT_PUBLIC_API_BASE_PREFIX="/prod-api"
NUXT_PUBLIC_API_BASE_URL="https://api.yoursite.com"
NUXT_PUBLIC_PREVIEW_BASE_URL="https://api.yoursite.com"
```

> 💡 **说明**:
> - `NUXT_PUBLIC_API_BASE_PREFIX`: API 路径前缀
> - `NUXT_PUBLIC_API_BASE_URL`: API 服务器地址
> - `NUXT_PUBLIC_PREVIEW_BASE_URL`: 文件资源访问地址

### Q: 如何添加新的页面？
A: 在 `pages/` 目录下创建 `.vue` 文件，Nuxt 会自动生成路由：
```bash
# 创建新页面
touch pages/about.vue
```

### Q: 权限控制如何工作？
A: 详见上方的 [🔐 权限控制系统](#-权限控制系统) 章节，包含完整的使用说明。

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
