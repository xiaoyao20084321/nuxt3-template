<script setup lang="ts">
// 页面权限配置
definePageMeta({
  auth: true, // 需要登录
  permissions: ['logined', 'vip'], // 需要登录且为VIP用户
  title: 'VIP专享页面',
  description: '仅VIP用户可访问的高级功能页面',
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
  <div class="admin-container">
    <div class="admin-header">
      <h1>VIP专享页面</h1>
      <p>欢迎，{{ userStore.userInfo.userName }}！</p>
      <p>这是一个需要VIP权限的高级功能页面</p>
    </div>

    <div class="admin-content">
      <el-card class="user-info-card">
        <template #header>
          <span>用户信息</span>
        </template>
        <div class="user-info">
          <p><strong>用户名：</strong>{{ userStore.userInfo.userName }}</p>
          <p><strong>用户ID：</strong>{{ userStore.userInfo.userId }}</p>
          <p><strong>VIP状态：</strong>{{ userStore.userInfo.isVip ? '是' : '否' }}</p>
          <p><strong>权限列表：</strong>{{ userStore.getUserPermissionKeys.join(', ') }}</p>
          <p><strong>按钮权限：</strong>{{ userStore.getUserBtnPermission.join(', ') }}</p>
        </div>
      </el-card>

      <el-card class="actions-card">
        <template #header>
          <span>VIP专享功能（权限控制示例）</span>
        </template>
        <div class="actions">
          <!-- 使用权限指令控制按钮显示 -->
          <el-button v-permission="['operation:user:create']" type="primary">
            高级功能A (需要 operation:user:create 权限)
          </el-button>
          <el-button v-perms="['operation:user:update']" type="warning">
            高级功能B (需要 operation:user:update 权限)
          </el-button>
          <el-button v-permission="['operation:user:delete']" type="danger">
            高级功能C (需要 operation:user:delete 权限)
          </el-button>

          <!-- 权限测试页面链接 -->
          <el-button type="success" @click="router.push('/permission-test')">
            权限测试页面
          </el-button>
        </div>
      </el-card>

      <div class="admin-actions">
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
.admin-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.admin-header {
  text-align: center;
  margin-bottom: 30px;
}

.admin-header h1 {
  color: #409eff;
  margin-bottom: 10px;
}

.admin-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-info-card,
.actions-card {
  width: 100%;
}

.user-info p {
  margin: 10px 0;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.admin-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .admin-container {
    padding: 10px;
  }

  .actions {
    flex-direction: column;
  }

  .admin-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
