/**
 * 判断文件数据类型
 * @param arrayBuffer 文件流
 * @returns
 */
export function detectArrayBufferType(arrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer)
  const header = Array.from(uint8Array.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join(' ')
  // 常见文件类型的签名
  const signatures = {
    '89 50 4E 47 0D 0A 1A 0A': 'image/png',
    'FF D8 FF': 'image/jpeg',
    '47 49 46 38': 'image/gif',
    '25 50 44 46': 'application/pdf',
    '52 49 46 46': 'audio/wav', // WAV
    '49 44 33': 'audio/mpeg', // MP3
    '66 74 79 70 69 73 6F 6D': 'video/mp4', // MP4
    '50 4B 03 04': 'application/zip', // ZIP
  }

  for (const [sig, type] of Object.entries(signatures)) {
    if (header.startsWith(sig.toLowerCase())) {
      return type
    }
  }

  return 'application/octet-stream' // 未知类型
}

/**
 * 根据文件流请求头获取文件名
 * @param disposition const contentDisposition = response.headers.get('Content-Disposition')
 * @returns
 */
export function getFilenameFromDisposition(disposition) {
  if (!disposition) return null

  function decodeRFC5987(value) {
    return decodeURIComponent(value.replace(/\+/g, ' '))
  }

  // 1. 优先尝试解析 RFC 5987 编码的文件名（filename*=utf-8''...）
  const utf8FilenameMatch = disposition.match(/filename\*=utf-8''([^;]+)/i)
  if (utf8FilenameMatch) return decodeRFC5987(utf8FilenameMatch[1])

  // 2. 回退到传统 filename="..."（需处理引号和分号）
  const filenameMatch = disposition.match(/filename="?([^"]+)"?/i) || disposition.match(/filename=([^;]+)/i)

  if (filenameMatch) {
    // 移除可能的引号和分号，并解码 URI 组件（如 %20 → 空格）
    return decodeURIComponent(filenameMatch[1].trim().replace(/[";]/g, ''))
  }

  return null
}
