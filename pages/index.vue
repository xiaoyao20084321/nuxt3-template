<script setup lang="ts">
// import { useQRCode } from '@vueuse/core'

definePageMeta({
  title: '首页',
  auth: false,
})

const appConfig = useAppConfig()

const themeColors = ref<any[]>(Object.entries(appConfig.colors).map(item => ({ label: item[0], value: item[1] })))

const beautifyCodeRef = ref<any>(null)
const text = ref<string>('')
const optionsConfig = {

}
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
      <div>
        <el-input v-model="text" aria-label="输入框" placeholder="输入生成二维码参数" />
      </div>

      <div flex items-center justify-center>
        <QRCodeBeautifyCode ref="beautifyCodeRef" :value="text" :options="optionsConfig" />
      </div>
    </NuxtLayout>
  </div>
</template>
