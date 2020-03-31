const utils = require('../../utils/util.js');
const request = require('../../utils/request.js');
const GoodsItem = require('../../template/goodsItem/index.js');
const ToTop = require('../../template/toTop/toTop.js');
const config = require('../../config.js')
Page(Object.assign({}, GoodsItem, ToTop,{
  data: {
    postData: {
      "pID": 1001,
      "pageNum": 1,
      "pageSize": 50,
      "sort": 2
    },
    goodsList: [],
    ui: {
      currentTabIndex: 0,
      "pagewidth": 0,
      "scrollPosition": 0,
      "toTopBtnIsHidden": true
    },
    category: []
  },
  clickTabItem: function (e) {
    this.setData({
      "ui.currentTabIndex": e.currentTarget.dataset.index
    });
    let categoryItem = this.data.category[e.currentTarget.dataset.index];
    let postData = this.data.postData;
    postData.pID = categoryItem.channelID;
    request.getGoodsList(postData, (data) => {
      this.setData({
        "goodsList": data.slice(0,20)
      });
      console.log(this.data.goodsList)
    });
  },
  clickToTop: function (e) {
    this.setData({
      'ui.scrollPosition': 0
    });
  },
  onLoad: function (options) {
    let systemInfo = wx.getSystemInfoSync()
    this.setData({
      "category": getApp().config.category,
      "ui.pageHeight": systemInfo.windowHeight,
      "ui.pagewidth": systemInfo.windowWidth
    });
    let categoryItem = this.data.category[this.data.ui.currentTabIndex];
    
    let postData = this.data.postData;
    postData.pID = categoryItem.channelID;
    request.getGoodsList(postData, (data) => {
      this.setData({
        "goodsList":data.slice(0,20)
      });
      console.log(this.data.goodsList)
    });
  },
  scrollEvent: function (e) {
    if (e.detail.scrollTop > this.data.ui.pagewidth && this.data.ui.toTopBtnIsHidden) {
      this.setData({
        "ui.toTopBtnIsHidden": false
      });
    } else if (e.detail.scrollTop < this.data.ui.pagewidth && !this.data.ui.toTopBtnIsHidden) {
      this.setData({
        "ui.toTopBtnIsHidden": true
      });
    }
  },
  clickGoodsItem:function(e){
    wx.navigateTo({
      url: '/pages/details/details?' + 'data=' + encodeURIComponent(JSON.stringify(this.data.goodsList[e.currentTarget.dataset.index])),
    });
  },
  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: config.wxAppName+'-热销排行榜',
      path: '/pages/charts/charts',
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