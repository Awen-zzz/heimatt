/** 为了方便项目中使用本地存储的时候，简便操作 封装 获取 设置 删除
 *
 * @param {*} key  本地存储里的key值就是密钥
 * @returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    console.log(error)
  }
}

/**
 *
 * @param {*} key   本地存储里的密钥
 * @param {*} value  本地存储里的密钥对应的值
 */
export function setItem (key, value) {
  if (typeof value === 'object') { // 复合数据类型
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

/**
 *根据key删除当前本地存储
 * @param {*} key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
/**
  * 删除所有本地存储
  */
export function clearItem () {
  window.localStorage.clearItem()
}
