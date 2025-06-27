<script setup lang="ts">
// import { useQRCode } from '@vueuse/core'

definePageMeta({
  auth: false,
})

const appConfig = useAppConfig()
const themeColors = ref<any[]>(Object.entries(appConfig.colors).map(item => ({ label: item[0], value: item[1] })))

// 使用编程式导航的例子
const router = useRouter()
function goToAbout() {
  router.push('/about')
}
</script>

<template>
  <div>
    <NuxtLayout>
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
