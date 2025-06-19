export default defineAppConfig({
  title: 'nuxt3-app',
  saasId: 0,

  upload_url: '/upload',
  upload_size: 2 * 1024 * 1024,

  // token 过期时间 一周
  maxAge: 60 * 60 * 24 * 7,
  // cookie localhost 应用到当前域 主域名
  domain: 'localhost',
  // 有效路径
  path: '/',
  // 防止跨站 strict | lax | none
  sameSite: 'lax',

  colors: {
    primary: '#409eff',
    success: '#7be188',
    warning: '#E6A23C',
    danger: '#F53F3F',
    info: '#909399',
  },
})
