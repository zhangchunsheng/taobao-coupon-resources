const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDateTime: function (inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  jsonToQueryStr: function (jsonObj) {
    let strArr = [];
    for (var key in jsonObj) {
      let str = `${key}=${jsonObj[key]}`;
      strArr.push(str);
    }
    return strArr.join('&');
  },
  isNullOrEmpty: function (str) {
    if (typeof (str) === 'string') {
      if (str.trim() == '') {
        return true;
      } else {
        return false;
      }
    }
    return true;
  },
  isSameVersion: function (serverVer, clientVer) {
    let serverVerArr = serverVer.split('.');
    let clientVerArr = clientVer.split('.');
    if (serverVerArr.length == 4 && clientVerArr.length == 4) {
      let sVer = Number(serverVerArr[0] + serverVerArr[1]);
      let cVer = Number(clientVerArr[0] + clientVerArr[1]);
      if (cVer == sVer) {
        return 0;
      }
      if (cVer > sVer) {
        return 1;
      }
      if (cVer < sVer) {
        return -1;
      }
    }
  },
  // 显示繁忙提示
  showBusy: text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
  }),

  // 显示成功提示
  showSuccess: text => wx.showToast({
    title: text,
    icon: 'success'
  }),
  showModel : (title, content) => {
    wx.hideToast();

    wx.showModal({
      title,
      content: JSON.stringify(content),
      showCancel: false
    })
  }
}
