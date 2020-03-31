// pages/details/details.js
const request = require('../../utils/request.js');
const BottomBar = require('./template/bottomBar/index.js');
const Coupon = require('./template/coupon/index.js');
const Detail = require('./template/detailImage/index.js');
const utils = require('../../utils/util.js');
const config = require('../../config.js');
const $ = require('../../vendor/wafer-client-sdk-master/index')
Page(Object.assign({}, BottomBar, Coupon, Detail, {
  data: {
    "couponInfo": {},
    "goods": {},
    "ui": {
      "currentTabIndex": 0,
      "btnShow": false,
      "pageShow": false,
      "pageHeight": 1000,
      "pagewidth": 0,
      "isFav": false,
      "couponButton": {
        "hidden": false,
        "text": ""
      }
    }
  },
  tabChange: function (event) {
    this.setData({
      "ui.currentTabIndex": event.target.dataset.tabIndex
    })
  },
  clickCoupon: function (e) {
    if (!utils.isNullOrEmpty(this.data.couponInfo.couponLinkTaoToken)) {
      wx.setClipboardData({
        data: this.data.couponInfo.couponLinkTaoToken,
        success: function (res) {
          wx.showModal({
            title: '',
            content: '领券成功，打开手机淘宝下单即可！',
            showCancel: false,
            confirmText: '我知道了',
            confirmColor: '#ff93a5'
          })
        }
      })
    } else {
      wx.showLoading({
        title: '领券中...',
      })
      request.post('/goods/coupon', { auctionid: this.data.couponInfo.auctionId }, (data) => {
        try {
          wx.hideLoading();
          this.setData({
            'couponInfo.couponLinkTaoToken': data.data.couponLinkTaoToken
          })
          wx.setClipboardData({
            data: this.data.couponInfo.couponLinkTaoToken,
            success: function (res) {
              wx.showModal({
                title: '',
                content: '领券成功，打开手机淘宝下单即可！',
                showCancel: false,
                confirmText: '我知道了',
                confirmColor: '#ff93a5'
              })
            }
          })
        } catch (e) {
          wx.showModal({
            title: '',
            content: '领券失败！',
            showCancel: false,
            confirmText: '我知道了',
            confirmColor: '#ff93a5'
          })
        }


      });
    }

  },
  clickHome: function (e) {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  clickFav: function (e) {
    if (!this.data.ui.isFav) {
      $.post({
        url: config.service.add_collection_like,
        data: this.data.couponInfo,
      }, (err, addResult) => {
        if (err) {
          console.log(err);
          return;
        }
        wx.showToast({
          title: addResult.data.data,
          icon: 'none',
          duration: 2000
        })
      });
      
    } else {
      $.post({
        url: config.service.remove_collection_like,
        data: {
          auctionId: this.data.couponInfo.auctionId
        },
      }, (err, removeResult)=>{
        if(err){
          console.log(err);
          return;
        }
        wx.showToast({
          title: removeResult.data.data,
          icon: 'none',
          duration: 2000
        })
      });
      
    }
    let isFav = !this.data.ui.isFav;
    this.setData({
      "ui.isFav":isFav
    });
  },
  clickPoint: function (e) {
    wx.navigateTo({
      url: '/pages/confirmOrder/confirmOrder?' + 'data=' + this.data.initData,
    });
  },
  couponScroll: function (e) {
    if (e.detail.scrollTop > this.data.ui.pagewidth * 1.53) {
      this.setData({
        "ui.btnShow": true
      });
    } else {
      this.setData({
        "ui.btnShow": false
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let couponInfo = JSON.parse(decodeURIComponent(options.data));
    this.setData({
      "couponInfo": couponInfo,
      "initData": options.data
    })

    let systemInfo = wx.getSystemInfoSync()
    wx.showLoading({
      title: '页面加载中...',
    })
    let that = this;
    request.post('/goods/detail', { "itemid": couponInfo.auctionId }, (data) => {
      wx.hideLoading();

      let groupProps = [];
      for (let item of data.groupProps) {
        for (let key in item) {
          groupProps.push({
            "key": key,
            "value": item[key]
          });
        }
      }
      data.groupProps = groupProps;
      that.setData({
        "goods": data,
        "goods.couponPrice": Number(couponInfo.couponAmount).toFixed(2),
        "goods.flpoints": (Number(couponInfo.tkCommFee) * 10).toFixed(0),
        "goods.salePrice": couponInfo.salePrice,
        "goods.sellCount": couponInfo.biz30day,
        "ui.pageShow": true,
        "ui.pageHeight": systemInfo.windowHeight,
        "ui.pagewidth": systemInfo.windowWidth
      });
      console.log(this.data);
    })
    let cVer = config.version;
    let sVer = getApp().config.wxAppUI.version.text;
    let result = utils.isSameVersion(sVer, cVer)
    if (result == 1) {//客户端版本大于服务器
      this.setData({
        "ui.couponButton": getApp().config.wxAppUI.couponButton
      })
    }
    /////////////
    $.post({
      url: config.service.isFav,
      data: {
        auctionId: that.data.couponInfo.auctionId
      }
    }, (err, isFavResult) => {
      if (err) {
        console.log(err);
        return;
      }
      that.setData({
        "ui.isFav": isFavResult.data.isFav
      });
    });
    
  },

  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `券后价${this.data.goods.salePrice}元 优惠券${this.data.goods.couponPrice}元 ${this.data.goods.title}`,
      path: '/pages/details/details?data=' + this.data.initData,
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