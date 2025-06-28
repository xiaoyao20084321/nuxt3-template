<script setup lang="ts">
// 页面权限配置
definePageMeta({
  auth: true, // 需要登录
  permissions: ['logined'], // 只需要登录即可
  title: '权限测试页面',
  description: '演示按钮权限控制的测试页面',
})

const { hasPermission, userBtnPermissions } = usePermission()
const userStore = useUserStore()
const router = useRouter()

// 测试API请求
const testApiLoading = ref(false)
const testApiResult = ref('')

async function testProtectedApi() {
  testApiLoading.value = true
  testApiResult.value = ''

  try {
    const response = await useHttp.get('/test/protected')
    testApiResult.value = `✅ 请求成功: ${response.msg}`
  }
  catch (error: any) {
    testApiResult.value = `❌ 请求失败: ${error.data?.msg || error.message}`
  }
  finally {
    testApiLoading.value = false
  }
}

// 退出登录
async function handleLogout() {
  const { logout } = useAuth()
  await logout()
  ElMessage.success('已退出登录')
  await router.push('/login')
}
</script>

<template>
  <div class="permission-test-container">
    <div class="page-header">
      <h1>权限测试页面</h1>
      <p>演示按钮级别的权限控制功能</p>
    </div>

    <div class="test-content">
      <!-- 用户信息卡片 -->
      <el-card class="user-info-card">
        <template #header>
          <span>当前用户信息</span>
        </template>
        <div class="user-info">
          <p><strong>用户名：</strong>{{ userStore.userInfo.userName }}</p>
          <p><strong>VIP状态：</strong>{{ userStore.userInfo.isVip ? '是' : '否' }}</p>
          <p><strong>页面权限：</strong>{{ userStore.getUserPermissionKeys.join(', ') || '无' }}</p>
          <p><strong>按钮权限：</strong>{{ userBtnPermissions.join(', ') || '无' }}</p>
        </div>
      </el-card>

      <!-- 权限指令测试 -->
      <el-card class="permission-directive-card">
        <template #header>
          <span>权限指令测试 (v-permission / v-perms)</span>
        </template>
        <div class="permission-buttons">
          <div class="button-group">
            <h4>功能权限测试：</h4>

            <!-- 功能A权限 -->
            <el-button v-permission="['operation:user:create']" type="primary">
              高级功能A (需要 operation:user:create)
            </el-button>

            <!-- 功能B权限 -->
            <el-button v-perms="['operation:user:update']" type="warning">
              高级功能B (需要 operation:user:update)
            </el-button>

            <!-- 功能C权限 -->
            <el-button v-permission="['operation:user:delete']" type="danger">
              高级功能C (需要 operation:user:delete)
            </el-button>

            <!-- VIP专享功能 -->
            <el-button v-perms="['operation:vip:special']" type="info">
              VIP专享功能 (需要 operation:vip:special)
            </el-button>
          </div>

          <div class="button-group">
            <h4>组合权限测试：</h4>

            <!-- 需要多个权限 -->
            <el-button v-permission="['operation:user:create', 'operation:user:update']" type="success">
              高级组合功能 (需要功能A和功能B权限)
            </el-button>
          </div>
        </div>
      </el-card>

      <!-- 编程式权限检查 -->
      <el-card class="programmatic-permission-card">
        <template #header>
          <span>编程式权限检查</span>
        </template>
        <div class="programmatic-buttons">
          <div class="button-group">
            <h4>使用 hasPermission 函数：</h4>

            <el-button type="primary" :disabled="!hasPermission('operation:user:create')">
              高级功能A (编程式检查)
            </el-button>

            <el-button type="warning" :disabled="!hasPermission(['operation:user:update'])">
              高级功能B (编程式检查)
            </el-button>

            <el-button type="danger" :disabled="!hasPermission('operation:user:delete')">
              高级功能C (编程式检查)
            </el-button>
          </div>

          <div class="permission-status">
            <h4>权限检查结果：</h4>
            <ul>
              <li>
                <span :class="hasPermission('operation:user:create') ? 'has-permission' : 'no-permission'">
                  {{ hasPermission('operation:user:create') ? '✅' : '❌' }} operation:user:create
                </span>
              </li>
              <li>
                <span :class="hasPermission('operation:user:update') ? 'has-permission' : 'no-permission'">
                  {{ hasPermission('operation:user:update') ? '✅' : '❌' }} operation:user:update
                </span>
              </li>
              <li>
                <span :class="hasPermission('operation:user:delete') ? 'has-permission' : 'no-permission'">
                  {{ hasPermission('operation:user:delete') ? '✅' : '❌' }} operation:user:delete
                </span>
              </li>
              <li>
                <span :class="hasPermission('operation:admin:manage') ? 'has-permission' : 'no-permission'">
                  {{ hasPermission('operation:admin:manage') ? '✅' : '❌' }} operation:admin:manage
                </span>
              </li>
            </ul>
          </div>
        </div>
      </el-card>

      <!-- Token刷新测试 -->
      <el-card class="api-test-card">
        <template #header>
          <span>Token刷新测试</span>
        </template>
        <div class="api-test">
          <p>点击下面的按钮测试受保护的API，该API有30%概率返回token过期，用于测试无感刷新功能：</p>
          <el-button type="primary" :loading="testApiLoading" @click="testProtectedApi">
            {{ testApiLoading ? '请求中...' : '测试受保护的API' }}
          </el-button>

          <div v-if="testApiResult" class="api-result">
            <p>{{ testApiResult }}</p>
          </div>
        </div>
      </el-card>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <el-button type="primary" @click="router.push('/')">
          返回首页
        </el-button>
        <el-button type="success" @click="router.push('/user')">
          用户页面
        </el-button>
        <el-button v-if="userStore.userInfo.isVip" type="warning" @click="router.push('/admin')">
          管理员页面
        </el-button>
        <el-button type="danger" @click="handleLogout">
          退出登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.permission-test-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h1 {
  color: #409eff;
  margin-bottom: 10px;
}

.test-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-info-card,
.permission-directive-card,
.programmatic-permission-card,
.api-test-card {
  width: 100%;
}

.user-info p {
  margin: 10px 0;
  line-height: 1.6;
}

.button-group {
  margin-bottom: 20px;
}

.button-group h4 {
  margin-bottom: 10px;
  color: #303133;
}

.permission-buttons,
.programmatic-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.permission-buttons .el-button,
.programmatic-buttons .el-button {
  margin: 5px;
}

.permission-status ul {
  list-style: none;
  padding: 0;
}

.permission-status li {
  margin: 8px 0;
  padding: 5px;
  border-radius: 4px;
}

.has-permission {
  color: #67c23a;
  background: #f0f9ff;
}

.no-permission {
  color: #f56c6c;
  background: #fef0f0;
}

.api-test {
  text-align: center;
}

.api-result {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  background: #f5f7fa;
  font-family: monospace;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .permission-test-container {
    padding: 10px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .permission-buttons .el-button,
  .programmatic-buttons .el-button {
    width: 100%;
    margin: 5px 0;
  }
}
</style>
