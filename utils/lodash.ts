/**
 * 防抖
 * @param func — The function to throttle.
 * @param wait — The number of milliseconds to throttle invocations to.
 * @returns
 */
export const $debounce = (func, wait = 500) => useDebounce(func, wait)

/**
 * 节流
 * @param func — The function to throttle.
 * @param wait — The number of milliseconds to throttle invocations to.
 * @returns
 */
export const $throttle = (func, wait = 500) => useThrottle(func, wait)

/**
 * 验证邮箱
 * @param value
 * @returns
 */
export function isEmail(value) {
  return isString(value) && /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(value)
}

/**
 * 验证手机号
 * @param value
 * @returns
 */
export function isMobile(value) {
  return isString(value) && /^1[3-9]\d{9}$/.test(value)
}

/**
 * 检查数值是否在 范围内 包含 end
 * @param value
 * @param start
 * @param end
 * @returns
 */
export function inRangeInclusive(value, start, end) {
  return useInRange(value, start, end + 1)
}
