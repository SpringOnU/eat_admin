export function typeTo(num) {
  const arry = ['杂物帮办', '快递帮拿', '互助学习', '外卖帮拿', '其它xxxx']
  if (Number(num) + 1) {
    // console.log(Number(num));
    return arry[num]
  } else {
    return arry[4]
  }
}

export function typeToAdvice(num) {
  const arry = ['功能建议', '购买遇到问题', '商品问题', '其他问题']
  if (Number(num) + 1) {
    // console.log(Number(num));
    return arry[num]
  } else {
    return arry[3]
  }
}

// 时间戳转换为时间格式字符串
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
};

//  转一张图片
export function base64ToBlob(urlData) {
    let arr = urlData.split('|');
    let arr1 = String(arr).split(',');
    if(arr1[0] == "data:image/png;base64"){
      return arr[0]
    }else{
      return false
    }
}

// 转所有图片
export function toBlobAll(urlData) {
  let arr = urlData.split('|');
    return arr
}
