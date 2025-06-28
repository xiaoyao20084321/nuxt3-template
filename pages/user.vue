<script setup lang="ts">
// 页面权限配置
definePageMeta({
  auth: true, // 需要登录
  permissions: ['logined'], // 只需要登录即可
  title: '用户页面',
  description: '登录用户可访问的页面',
})

const userStore = useUserStore()
const router = useRouter()

// 退出登录
async function handleLogout() {
  userStore.clearUserInfo()
  ElMessage.success('已退出登录')
  await router.push('/login')
}
</script>

<template>
  <div class="user-container">
    <div class="user-header">
      <h1>用户页面</h1>
      <p>欢迎，{{ userStore.userInfo.userName }}！</p>
      <p>这是一个需要登录的页面</p>
    </div>

    <div class="user-content">
      <el-card class="user-info-card">
        <template #header>
          <span>用户信息</span>
        </template>
        <div class="user-info">
          <p><strong>用户名：</strong>{{ userStore.userInfo.userName }}</p>
          <p><strong>用户ID：</strong>{{ userStore.userInfo.userId }}</p>
          <p><strong>VIP状态：</strong>{{ userStore.userInfo.isVip ? '是' : '否' }}</p>
          <p><strong>权限列表：</strong>{{ userStore.getUserPermissionKeys.join(', ') }}</p>
        </div>
      </el-card>

      <el-card class="navigation-card">
        <template #header>
          <span>页面导航</span>
        </template>
        <div class="navigation">
          <el-button type="primary" @click="router.push('/')">
            首页 (无权限要求)
          </el-button>
          <el-button type="success" @click="router.push('/user')">
            用户页面 (需要登录)
          </el-button>
          <el-button type="warning" :disabled="!userStore.userInfo.isVip" @click="router.push('/admin')">
            VIP专享页面 (需要VIP权限)
          </el-button>
        </div>
        <div class="navigation-tips">
          <p v-if="!userStore.userInfo.isVip" class="tip-warning">
            ⚠️ 您不是VIP用户，无法访问VIP专享功能
          </p>
          <p v-else class="tip-success">
            ✅ 您是VIP用户，可以使用所有高级功能
          </p>
        </div>
      </el-card>

      <div class="user-actions">
        <el-button type="primary" @click="router.push('/')">
          返回首页
        </el-button>
        <el-button type="danger" @click="handleLogout">
          退出登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.user-header {
  text-align: center;
  margin-bottom: 30px;
}

.user-header h1 {
  color: #67c23a;
  margin-bottom: 10px;
}

.user-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-info-card,
.navigation-card {
  width: 100%;
}

.user-info p {
  margin: 10px 0;
  line-height: 1.6;
}

.navigation {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.navigation-tips {
  padding: 10px;
  border-radius: 5px;
}

.tip-warning {
  color: #e6a23c;
  background: #fdf6ec;
  padding: 10px;
  border-radius: 5px;
  margin: 0;
}

.tip-success {
  color: #67c23a;
  background: #f0f9ff;
  padding: 10px;
  border-radius: 5px;
  margin: 0;
}

.user-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .user-container {
    padding: 10px;
  }

  .navigation {
    flex-direction: column;
  }

  .user-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
