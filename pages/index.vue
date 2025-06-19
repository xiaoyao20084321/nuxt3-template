<script setup lang="ts">
// import { useQRCode } from '@vueuse/core'

definePageMeta({
  auth: false,
})

const appConfig = useAppConfig()
const themeColors = ref<any[]>(Object.entries(appConfig.colors).map(item => ({ label: item[0], value: item[1] })))

</script>

<template>
  <div>
    <NuxtLayout>
      <div>
        <NuxtTime :datetime="Date.now()" year="numeric" month="short" day="numeric" hour="numeric" minute="numeric"
          second="numeric" />
      </div>
      <div>
        <template v-for="(item, index) in themeColors" :key="index">
          <el-button :type="item.label">
            {{ item.label }}
          </el-button>
        </template>
      </div>
    </NuxtLayout>
  </div>
</template>
