import Vue from 'vue'
import dayjs from 'dayjs'

/**
 * @function 日前格式化过滤器
 * @param value：日期
 * @param rule：希望得到的日期格式
 */
Vue.filter('formatDate', function (value, rule) {
  if (String(value).length === 10) {
    return dayjs(value * 1000).format(rule)
  } else {
    return dayjs(value).format(rule)
  }
})

/**
 * @function 乘法函数，用来得到精确的乘法结果
 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * 调用：accMul(arg1,arg2)
 * 返回值：arg1乘以 arg2的精确结果
 */
Vue.filter('accMul', function (val, mul) {
  let multiplier = mul || 100
  let value = val || 0
  let m = 0
  let s1 = String(value)
  let s2 = String(multiplier)
  if (/\./.test(s1)) {
    m += s1.split('.')[1].length
  }
  if (/\./.test(s2)) {
    m += s2.split('.')[1].length
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
})
