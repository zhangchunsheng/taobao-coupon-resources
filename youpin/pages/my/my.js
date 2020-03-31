const Grid = require('../../template/grid/index.js');
const $ = require('../../vendor/wafer-client-sdk-master/index');
const util = require('../../utils/util.js');
const config = require('../../config.js');
Page(Object.assign({}, Grid, {
  data: {
    "userInfo": {},
    "ui": {
      "isSignIn": false,
      "signInTitle":'',
      "toolBarHidden":false
    },
    logged: false,
    takeSession: false,
    requestResult: '',
    "category": [{
      "image": "/images/sendorder.png",
      "sort": 1,
      "title": "提交订单",
      "keyword": "",
      "type": ""
    }, {
      "image": "/images/myorder.png",
      "sort": 2,
      "title": "我的订单",
      "keyword": "",
      "type": ""
    }, {
      "image": "/images/myfav.png",
      "sort": 3,
      "title": "我的收藏",
      "keyword": "",
      "type": ""
    }, {
      "image": "/images/jfjl.png",
      "sort": 4,
      "title": "积分明细",
      "keyword": "",
      "type": ""
    }, {
      "image": "/images/jfsc.png",
      "sort": 5,
      "title": "赚积分",
      "keyword": "",
      "type": ""
    }, {
      "image": "/images/fxyj.png",
      "sort": 6,
      "title": "邀请好友",
      "keyword": "",
      "type": "share"
    }, {
      "image": "/images/cqjc.png",
      "sort": 7,
      "title": "查券教程",
      "keyword": "",
      "type": ""
    }, {
      "image": "/images/kf.png",
      "sort": 8,
      "title": "联系客服",
      "keyword": "",
      "type": ""
    }]
  },
  onLoad: function (options) {
    let cVer = config.version;
    let sVer = getApp().config.wxAppUI.version.text;
    let result = util.isSameVersion(sVer, cVer)
    if (result == 1) {//客户端版本大于服务器
      this.setData({
        "ui.toolBarHidden": getApp().config.wxAppUI.couponButton
      })
    }
  },
  onShow: function () {
    
    let that=this;
    $.get({
      url: config.service.userUrl
    }, (err, userinfo)=>{
      if(err){
        console.log(err);
        return;
      }
      console.log(userinfo);
      that.setData({
        "userInfo": userinfo.data.data,
      });
      let startTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
      let endTime = new Date(new Date().setHours(23, 59, 59, 0)).getTime();
      if (that.data.userInfo.signInTime < startTime && that.data.userInfo.signInTime < endTime) {
        that.setData({
          "ui.isSignIn": false,
          "ui.signInTitle": "每日签到领积分"
        });
      } else {
        that.setData({
          "ui.isSignIn": true,
          "ui.signInTitle": `连续签到${that.data.userInfo.signInNum}天`
        });
      }
      console.log(userinfo);
    });
  },
  clickGridItem: function (e) {
    if (this.data.category[e.currentTarget.dataset.index].title == '查券教程') {
      wx.navigateTo({
        url: '/pages/help/help'
      });
    } else if (this.data.category[e.currentTarget.dataset.index].title == '联系客服') {
      wx.navigateTo({
        url: '/pages/contact/contact'
      });
    } else if (this.data.category[e.currentTarget.dataset.index].title == '赚积分') {
      wx.navigateTo({
        url: '/pages/integralHelp/integralHelp'
      });
    } else if (this.data.category[e.currentTarget.dataset.index].title == '积分明细') {
      wx.navigateTo({
        url: '/pages/integralLog/integralLog'
      });
    } else if (this.data.category[e.currentTarget.dataset.index].title == '我的订单') {
      wx.navigateTo({
        url: '/pages/myOrder/myOrder'
      });
    } else if (this.data.category[e.currentTarget.dataset.index].title == '提交订单') {
      wx.navigateTo({
        url: '/pages/submitOrder/submitOrder'
      });
    } else if (this.data.category[e.currentTarget.dataset.index].title == '我的收藏') {
      wx.navigateTo({
        url: '/pages/myFav/myFav'
      });
    }
  },
  signIn:  function (e) {
    if (!this.data.ui.isSignIn){
      $.get({
        url: config.service.signin
      },(err,result)=>{
        if (result.data.success) {
          this.setData({
            "userInfo.signInNum": result.data.signInNum,
            "userInfo.signInTime": result.data.signInTime,
            "userInfo.integral": result.data.integral,
            "ui.isSignIn": true,
            "ui.signInTitle": `连续签到${result.data.signInNum}天`
          });
        }
      });
      
    }
  },
  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    let path = this.data.userInfo.openId ? `/pages/index/index?e=${this.data.userInfo.openId}` :'/pages/index/index'
    return {
      title: config.wxAppName + `-积分换商品`,
      path: path,
      imageUrl: '/images/showAD.png',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res);
      }
    }
  }
}))