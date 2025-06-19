import chroma from 'chroma-js'

export function useTheme() {
  // 生成 Element Plus 需要的全套颜色变量
  const generateThemeColors = (name: string, color: string) => {
    const baseColor = chroma(color)
    return {
      [`--el-color-${name}`]: baseColor.hex(),
      [`--el-color-${name}-light-3`]: baseColor.brighten(0.3).hex(),
      [`--el-color-${name}-light-5`]: baseColor.brighten(0.5).hex(),
      [`--el-color-${name}-light-7`]: baseColor.brighten(0.7).hex(),
      [`--el-color-${name}-light-8`]: baseColor.brighten(0.8).hex(),
      [`--el-color-${name}-light-9`]: baseColor.brighten(0.9).hex(),
      [`--el-color-${name}-dark-2`]: baseColor.darken(0.2).hex(),
    }
  }

  // 应用主题色
  const applyTheme = (name, color) => {
    const colors = generateThemeColors(name, color)
    const root = document.documentElement
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    // 保存到本地存储
    localStorage.setItem(`element-theme-${name}`, color)
  }

  // 初始化主题
  const initTheme = (name, color) => {
    applyTheme(name, color)
  }

  return {
    generateThemeColors,
    applyTheme,
    initTheme,
  }
}
