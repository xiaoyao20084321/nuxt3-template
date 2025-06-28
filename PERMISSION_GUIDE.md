# Nuxt3 权限控制系统使用指南

本项目实现了完整的权限控制系统，包括路由拦截、权限控制、用户信息保存、AccessToken过期刷新和按钮权限控制。

## 功能特性

### 1. 路由拦截/权限控制

- ✅ 全局路由中间件自动拦截所有路由
- ✅ 支持页面级权限配置 (`auth` 和 `permissions`)
- ✅ 自动重定向到登录页面
- ✅ 支持登录后重定向到原页面
- ✅ 支持403权限不足错误页面

### 2. 用户信息保存

- ✅ 使用 Pinia Store 管理用户状态
- ✅ 自动持久化到本地存储 (pinia-plugin-persistedstate)
- ✅ 支持用户信息、权限、VIP状态、按钮权限等
- ✅ 响应式用户状态管理

### 3. AccessToken过期刷新

- ✅ 无感知自动刷新机制
- ✅ 请求队列管理，避免重复刷新
- ✅ 失败请求自动重试
- ✅ 刷新失败自动跳转登录页
- ✅ 支持并发请求的token刷新

### 4. 按钮权限控制

- ✅ 权限指令 `v-permission` / `v-perms`
- ✅ 编程式权限检查函数 `hasPermission`
- ✅ 全局权限检查方法
- ✅ 权限不足时自动隐藏按钮

## 快速开始

### 1. 启动项目

```bash
npm install
npm run dev
```

### 2. 测试账号

根据登录页面的提示：

- **VIP用户**: admin / 123456 (拥有VIP权限和所有高级功能)
- **普通用户**: user / 123456 (基础权限，部分高级功能)

### 3. 测试页面

- `/` - 首页 (无权限要求)
- `/login` - 登录页面
- `/user` - 用户页面 (需要登录)
- `/admin` - VIP专享页面 (需要VIP权限)
- `/permission-test` - 权限测试页面 (演示按钮权限和API调用)

## 使用方法

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

#### 1. 使用权限指令

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

#### 2. 编程式权限检查

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

// 获取用户权限
console.log('用户权限:', userStore.getUserPermissionKeys)

// 获取用户按钮权限
console.log('按钮权限:', userStore.getUserBtnPermission)
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

## 权限类型说明

### 页面权限

- `logined` - 已登录权限
- `vip` - VIP用户权限

### 按钮权限

- `operation:user:create` - 创建用户权限
- `operation:user:update` - 更新用户权限
- `operation:user:delete` - 删除用户权限
- `operation:admin:manage` - 管理员操作权限

## 文件结构

```
nuxt3-template/
├── stores/
│   └── user.ts                 # 用户状态管理 (Pinia Store)
├── hooks/                      # 组合式函数 (重命名为hooks)
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

## 核心实现说明

### 1. 用户状态管理 (`stores/user.ts`)

- 使用 Pinia Store 管理用户状态
- 支持持久化存储 (pinia-plugin-persistedstate)
- 提供计算属性：`getUserPermissionKeys`、`getUserBtnPermission`、`isLoggedIn`

### 2. 路由权限中间件 (`middleware/token.global.ts`)

- 全局路由拦截，检查页面权限
- 支持 `auth` 和 `permissions` 配置
- 自动重定向到登录页面
- 权限不足时显示403错误

### 3. HTTP客户端 (`hooks/useHttp.ts`)

- 基于 `$fetch` 封装
- 自动添加 Authorization 头
- 无感知token刷新机制
- 请求队列管理，避免重复刷新

### 4. 权限指令 (`plugins/permission.client.ts`)

- 注册 `v-permission` 和 `v-perms` 指令
- 权限不足时自动隐藏元素
- 支持单个或多个权限检查

## 注意事项

1. **权限配置**:

   - 页面权限在 `definePageMeta` 中配置 (`auth` 和 `permissions`)
   - 按钮权限通过用户的 `userBtnPermission` 数组控制

2. **Token刷新**:

   - HTTP客户端会自动处理token过期，无需手动处理
   - 支持并发请求的token刷新，避免重复刷新

3. **权限指令**:

   - 没有权限的按钮会被隐藏 (`display: none`)，不是禁用
   - 支持 `v-permission` 和 `v-perms` 两种写法

4. **持久化**:

   - 用户信息会自动保存到本地存储，刷新页面后仍然有效
   - 使用 `pinia-plugin-persistedstate` 插件

5. **服务端渲染**:

   - 权限检查在客户端进行，避免服务端渲染时的水合不匹配
   - 中间件中有 `if (import.meta.server) return` 判断

6. **错误处理**:
   - 权限不足时显示403错误页面
   - Token刷新失败时自动跳转登录页

## 扩展说明

### 添加新的权限类型

1. **页面权限**: 在 `stores/user.ts` 的 `getUserPermissionKeys` 计算属性中添加新的权限判断逻辑

2. **按钮权限**: 在用户数据的 `userBtnPermission` 数组中添加新的权限标识

3. **权限检查**: 在 `utils/permission.ts` 中添加新的权限检查函数

### 自定义权限逻辑

```typescript
// stores/user.ts
const getUserPermissionKeys = computed(() => {
  const permissionKeys: string[] = []

  // 登录权限
  if (!!userInfo.value.accessToken && !!userInfo.value.refreshToken) {
    permissionKeys.push('logined')
  }

  // VIP权限
  if (userInfo.value.isVip) {
    permissionKeys.push('vip')
  }

  // 添加自定义权限
  if (userInfo.value.customRole === 'admin') {
    permissionKeys.push('admin')
  }

  return permissionKeys
})
```

### 添加新的API接口

在 `apis/user.ts` 中添加新的API函数，会自动享受token刷新功能：

```typescript
// 新增API接口
export async function getCustomData() {
  return useHttp.get<CustomData>('/custom/data')
}
```

## 总结

本项目实现了一套完整的权限控制系统，具有以下特点：

### ✅ 完整性

- 涵盖了路由拦截、页面权限、按钮权限、用户状态管理、token刷新等完整功能
- 参照 uniapp-temp 项目的设计理念，适配 Nuxt3 框架特性

### ✅ 易用性

- 简单的配置方式：`definePageMeta` 配置页面权限，`v-permission` 指令控制按钮
- 自动化处理：token刷新、权限检查、状态持久化都是自动进行
- 友好的开发体验：TypeScript 支持、响应式状态管理

### ✅ 可扩展性

- 模块化设计，各功能独立且可扩展
- 支持自定义权限类型和权限逻辑
- 易于集成到现有项目中

### ✅ 稳定性

- 完善的错误处理机制
- 避免服务端渲染水合不匹配问题
- 支持并发请求的token刷新

这套权限系统可以满足大多数前端项目的权限控制需求，同时保持了良好的代码结构和开发体验。
