const utils = {}

/**
 * @function 获取通过name获得Cookie
 */
utils.getCookie = (name) => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

/**
 * @function 获取通过name获得Cookie
 */
utils.setCookie = (cName, value, maxAge) => {
  let domainArr = window.location.host.split('.')
  let domain = ''
  if (domainArr.length === 3) {
    domainArr.shift()
    domain = domainArr.join('.')
  }
  document.cookie = cName + '=' + escape(value) + ((maxAge === null) ? '' : ';max-age=' + maxAge) + ';path=/;domain=' + domain
}

export default utils
