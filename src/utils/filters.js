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
