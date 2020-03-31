const qcloud = require('../../vendor/wafer-client-sdk-master/index')
const util = require('../../utils/util.js');
const config = require('../../config.js');
Page({
  data: {
    "couponInfo": {},
    "userInfo": {},
    "orderInfo": ''
  },

  onLoad: function (options) {
    let that = this;
    let couponInfo = JSON.parse(decodeURIComponent(options.data));
    let userinfo = qcloud.get({
      url: config.service.userUrl
    }, (err, userinfo)=>{
      that.setData({
        "userInfo": userinfo.data.data,
      });

      let zkPrice = couponInfo.zkPrice;//原价
      let couponAmount = couponInfo.couponAmount//券价
      let zkPoint = Number((zkPrice * 100).toFixed(0));//原价积分价
      let salePoint = Number(((zkPrice - couponAmount) * 100).toFixed(0));//券后积分价
      if (that.data.userInfo.level == 1) {//普通会员权益
        couponInfo.pointPrice = zkPoint;
      } else if (that.data.userInfo.level == 2) {//高级会员权益
        couponInfo.pointPrice = salePoint;
        couponInfo.zkPrice = Number((zkPrice - couponAmount).toFixed(2));
      }
      that.setData({
        "couponInfo": couponInfo
      })
      if (that.data.userInfo.userName == '' || that.data.userInfo.address == '' || that.data.userInfo.phoneNum == '') {
        wx.chooseAddress({
          success: function (res) {
            that.setData({
              "userInfo.userName": res.userName,
              "userInfo.address": `${res.provinceName} ${res.cityName} ${res.countyName} ${res.detailInfo}`,
              "userInfo.phoneNum": res.telNumber,
              "userInfo.postalCode": res.postalCode
            });
          }
        })
      }

    });

  },
  inputOrderInfo: function (e) {
    this.setData({
      'orderInfo': e.detail.value
    });
  },
  chooseAddress: function (e) {
    let that = this;
    wx.chooseAddress({
      success: function (res) {
        that.setData({
          "userInfo.userName": res.userName,
          "userInfo.address": `${res.provinceName} ${res.cityName} ${res.countyName} ${res.detailInfo}`,
          "userInfo.phoneNum": res.telNumber,
          "userInfo.postalCode": res.postalCode
        });
      }
    })
  },
  confirmOrder: function (e) {
    let that =this;
    if (this.data.orderInfo == '') {
      wx.showModal({
        title: '提示',
        content: '买家留言不能空',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#ff93a5'
      })
      return;
    }
    let postData = {
      "_id": this.data.couponInfo._id,
      "userName": this.data.userInfo.userName,
      "address": this.data.userInfo.address,
      "phoneNum": this.data.userInfo.phoneNum,
      "postalCode": this.data.userInfo.postalCode,
      "orderInfo": this.data.orderInfo,
    }
    qcloud.post({
      url: config.service.confirm_order,
      data: postData
    },(err,resData)=>{
      if (resData.data.success) {
        wx.showModal({
          title: '提示',
          content: resData.data.data,
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ff93a5',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack();
            }
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: resData.data.data,
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#ff93a5'
        })
      }
      console.log(resData);
    });
    
  }
})