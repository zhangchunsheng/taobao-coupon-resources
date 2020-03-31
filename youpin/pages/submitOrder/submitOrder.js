const qcloud = require('../../vendor/wafer-client-sdk-master/index')
const util = require('../../utils/util.js');
const config = require('../../config.js');
Page({
  data: {
    "orderId": ''
  },
  submitOrder: function (e) {
    if (this.data.orderId.trim() == '') {
      wx.showModal({
        title: '提示',
        content: '订单号不能为空',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#ff93a5'
      })
      return;
    }
    
    qcloud.post({
      url: config.service.submit_order,
      data: {
        "orderId": this.data.orderId
      }
    },(err,result)=>{
      console.log(result)
      if (result.data) {
        wx.showModal({
          title: '提示',
          content: result.data.data,
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ff93a5'
        })
      } else {
        wx.showModal({
          title: '错误',
          content: '提交订单失败，请检查网络！',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ff93a5'
        })
      }
    });
    
  },
  inputOrder: function (e) {
    this.setData({
      'orderId': e.detail.value
    });
  },
  onLoad: function (options) {

  }
})