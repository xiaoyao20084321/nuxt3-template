<script setup lang="ts">
import UQRCode from 'uqrcodejs'

interface Props {
  value?: string
  options?: any
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  options: () => { },
})

const loading = ref<boolean>(false)
const imageURL = ref<string>('')

watch(() => props, () => init(), { deep: true, immediate: true })

function init() {
  loading.value = true
  const options = {
    data: props.value || 'https://uqrcode.cn/doc/',
    size: 200,
    margin: 10,
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    errorCorrectLevel: 2,
    foregroundImageSrc: 'data:image/png;base64,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',
    ...props.options,
  }
  const qr = new UQRCode()
  qr.setOptions(options)
  qr.make()
  const drawModules = qr.getDrawModules()
  let dom = ''
  for (let i = 0; i < drawModules.length; i++) {
    const drawModule = drawModules[i]
    switch (drawModule.type) {
      case 'tile':
        /* 绘制小块 */
        dom += `<rect x="${drawModule.x}" y="${drawModule.y}" width="${drawModule.width}" height="${drawModule.height}" fill="${drawModule.color}" />`
        break
      case 'image':
        /* 绘制图像 */
        dom += `<image href="${drawModule.imageSrc}" x="${drawModule.x}" y="${drawModule.y}" width="${drawModule.width}" height="${drawModule.height}" />`
        break
    }
  }
  const html = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">${dom}</svg>`
  const blob = new Blob([html], { type: 'image/svg+xml' })
  imageURL.value = URL.createObjectURL(blob)
  loading.value = false
}

onUnmounted(() => {
  URL.revokeObjectURL(imageURL.value)
})
</script>

<template>
  <div class="h-200px w-200px rounded bg-white shadow">
    <el-image v-loading="loading" :src="imageURL" class="block h-full w-full" />
  </div>
</template>
