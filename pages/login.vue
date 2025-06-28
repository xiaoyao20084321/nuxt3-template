<script setup lang="ts">
definePageMeta({
  auth: false, // 登录页不需要认证
  layout: false, // 不使用默认布局
})

const { login, logout, isLoggedIn } = useAuth()
const route = useRoute()
const router = useRouter()

// 登录表单数据
const loginForm = reactive({
  username: 'admin',
  password: '123456',
})

// 登录状态
const loading = ref(false)

// 登录函数
async function handleLogin() {
  if (!loginForm.username || !loginForm.password) {
    ElMessage.error('请输入用户名和密码')
    return
  }

  loading.value = true

  try {
    await login(loginForm)
    ElMessage.success('登录成功')

    // 获取重定向地址
    const redirect = route.query.redirect as string

    // 跳转到重定向地址或首页
    await router.push(redirect || '/')
  }
  catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请重试')
  }
  finally {
    loading.value = false
  }
}

// 退出登录
async function handleLogout() {
  await logout()
  ElMessage.success('已退出登录')
  await router.push('/login')
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">
        用户登录
      </h2>

      <div v-if="!isLoggedIn" class="login-form">
        <el-form :model="loginForm" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" @keyup.enter="handleLogin" />
          </el-form-item>

          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" @keyup.enter="handleLogin" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :loading="loading" style="width: 100%" @click="handleLogin">
              {{ loading ? '登录中...' : '登录' }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-tips">
          <p>测试账号：</p>
          <p>VIP用户：admin / 123456 (拥有VIP权限和所有高级功能)</p>
          <p>普通用户：user / 123456 (基础权限，部分高级功能)</p>
        </div>
      </div>

      <div v-else class="logout-section">
        <p>您已登录，当前用户：{{ useUserStore().userInfo.userName }}</p>
        <el-button type="danger" @click="handleLogout">
          退出登录
        </el-button>
        <el-button type="primary" @click="router.push('/')">
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90vw;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.login-tips {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 5px;
  font-size: 14px;
  color: #666;
}

.logout-section {
  text-align: center;
}

.logout-section p {
  margin-bottom: 20px;
  color: #333;
}

.logout-section .el-button {
  margin: 0 10px;
}
</style>
