/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  // 用户名正则，4到16位（字母，数字，下划线，减号）
  const uPattern = /^[a-zA-Z0-9_-]{4,16}$/
  return uPattern.test(str)
}

export function isvalidEmail(str) {
  // 邮箱正则
  const uPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  return uPattern.test(str)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
