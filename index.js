/**
 * @description: 日期格式化
 * @param {*} value：当前的时间
 * @param {*} format：格式化的表达式
 * @return: 格式化后的时间
 */
const timeFormatData = (value, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (!value) return ''
  let time = new Date(+value)
  let args = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3), // quarter
    'S': time.getMilliseconds()
  }
  if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (let i in args) {
    let n = args[i]
    if (new RegExp('(' + i + ')').test(format)) { format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length)) }
  }
  return format
}

/**
 * @description: 取前一天时间的方法
 * @param {*} parent: 前几天，默认是前一天，取当天传0
 * @param {*} str: 返回时间的分割符,默认是-
 * @return: yyyy-MM-dd
 */
const getParentDate = (parent = 1, str = "-") => {
  let date = new Date(new Date() - 24 * 60 * 60 * 1000 * parent)
  let tmp = date.getMonth().valueOf() + 1
  let month = tmp > 9 ? tmp : '0' + tmp
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  return date.getFullYear() + str + month + str + day
}

/**
 * @description: 获取上一个月的第一天和上一个月的最后一天
 * @params: 
 * @return: array: [firstDay, lastDay]
 */
const getLastMonthDay = () => {
  let array = []
  let nowDays = new Date()
  let year = nowDays.getFullYear()
  let month = nowDays.getMonth()
  if (month == 0) {
    // 1月的上一个月为12月，年份减1
    month = 12
    year = year - 1
  }
  if (month < 10) {
    month = '0' + month
  }
  let firstDay = year + '-' + month + '-' + '01'// 上个月的第一天
  let myDate = new Date(year, month, 0)
  let lastDay = year + '-' + month + '-' + myDate.getDate()// 上个月的最后一天
  array.push(firstDay)
  array.push(lastDay)
  return array
}

// 我是dev_20210305的分支，

export {
  timeFormatData,
  getParentDate,
  getLastMonthDay
}