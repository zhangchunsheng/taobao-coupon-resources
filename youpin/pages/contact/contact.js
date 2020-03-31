const config = require('../../config.js')
Page({
  data: {
    "host": config.service.host,
    "contact":{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "contact": getApp().config.wxAppUI.contact
    })
    console.log(this.data)
  },
})