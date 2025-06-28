<script setup lang="ts">
// import { useQRCode } from '@vueuse/core'

definePageMeta({
  auth: false,
  title: '首页',
  description: '欢迎来到Nuxt3模板项目',
})

const appConfig = useAppConfig()
const userStore = useUserStore()
const router = useRouter()

const themeColors = ref<any[]>(Object.entries(appConfig.colors).map(item => ({ label: item[0], value: item[1] })))

// 使用编程式导航的例子
function goToAbout() {
  router.push('/about')
}

// 退出登录
async function handleLogout() {
  userStore.clearUserInfo()
  await removeToken()
  ElMessage.success('已退出登录')
  await router.push('/login')
}
</script>

<template>
  <div>
    <NuxtLayout>
      <!-- 用户状态显示 -->
      <div class="user-status">
        <div v-if="userStore.isLoggedIn" class="logged-in">
          <p>欢迎回来，{{ userStore.userInfo.userName }}！</p>
          <p>权限：{{ userStore.getUserPermissionKeys.join(', ') || '无' }}</p>
          <el-button type="danger" size="small" @click="handleLogout">
            退出登录
          </el-button>
        </div>
        <div v-else class="not-logged-in">
          <p>您尚未登录</p>
          <el-button type="primary" size="small" @click="router.push('/login')">
            去登录
          </el-button>
        </div>
      </div>

      <!-- 权限测试导航 -->
      <div class="permission-demo">
        <h2>权限控制演示</h2>
        <div class="demo-buttons">
          <el-button type="primary" @click="router.push('/')">
            首页 (无权限要求)
          </el-button>
          <el-button type="success" @click="router.push('/user')">
            用户页面 (需要登录)
          </el-button>
          <el-button type="warning" @click="router.push('/admin')">
            VIP专享页面 (需要VIP权限)
          </el-button>
          <el-button type="info" @click="router.push('/permission-test')">
            权限测试页面 (按钮权限演示)
          </el-button>
        </div>
        <div class="demo-tips">
          <p>💡 测试说明：</p>
          <ul>
            <li>首页：无权限要求，任何人都可以访问</li>
            <li>用户页面：需要登录，登录后即可访问</li>
            <li>VIP专享页面：需要登录且为VIP用户才能访问高级功能</li>
            <li>权限测试页面：演示按钮权限控制和Token刷新功能</li>
          </ul>
        </div>
      </div>

      <div>
        <NuxtTime
          :datetime="Date.now()" year="numeric" month="short" day="numeric" hour="numeric" minute="numeric"
          second="numeric"
        />
      </div>
      <div class="my-4">
        <template v-for="(item, index) in themeColors" :key="index">
          <el-button :type="item.label">
            {{ item.label }}
          </el-button>
        </template>
      </div>

      <!-- 页面跳转示例 -->
      <div class="my-4 space-x-4">
        <h2 class="mb-2 text-xl font-bold">
          页面跳转示例：
        </h2>
        <!-- 方式1：使用NuxtLink -->
        <NuxtLink to="/about" class="mr-4 text-blue-500 hover:underline">
          使用NuxtLink跳转到关于页面
        </NuxtLink>

        <!-- 方式2：使用编程式导航 -->
        <el-button type="primary" @click="goToAbout">
          使用编程式导航跳转
        </el-button>

        <!-- 方式3：使用navigateTo辅助函数 -->
        <el-button type="success" @click="navigateTo('/about')">
          使用navigateTo跳转
        </el-button>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.user-status {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  background: #f5f7fa;
}

.logged-in {
  color: #67c23a;
}

.not-logged-in {
  color: #909399;
}

.permission-demo {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #ebeef5;
}

.permission-demo h2 {
  margin-bottom: 20px;
  color: #303133;
}

.demo-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.demo-tips {
  padding: 15px;
  background: #f0f9ff;
  border-radius: 5px;
  border-left: 4px solid #409eff;
}

.demo-tips p {
  margin: 0 0 10px 0;
  font-weight: bold;
  color: #409eff;
}

.demo-tips ul {
  margin: 0;
  padding-left: 20px;
}

.demo-tips li {
  margin: 5px 0;
  color: #606266;
}

@media (max-width: 768px) {
  .demo-buttons {
    flex-direction: column;
  }
}
</style>
