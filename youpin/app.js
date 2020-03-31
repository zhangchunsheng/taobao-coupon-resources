//app.js
const qcloud = require('./vendor/wafer-client-sdk-master/index')
const config = require('./config')

App({
  config: {},
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  onShow: function () {
    /* wx.getClipboardData({
      success: function (res) {
        console.log(res.data)
      }
    }) */
  }
})