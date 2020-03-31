const GoodsItem = require('../../template/goodsItem/index.js');
const ToTop = require('../../template/toTop/toTop.js');
const utils = require('../../utils/util.js');
const request = require('../../utils/request.js');
const config = require('../../config.js');
Page(Object.assign({}, GoodsItem, ToTop, {
  data: {
    postData: {
    },
    ui: {
      "title":"",
      "pagewidth": 0,
      "scrollPosition": 0,
      "toTopBtnIsHidden": true,
      "bgImage": null
    },
    currentSortItem: 0,
    sortData: [
      {
        'title': '默认',
        'sortType': 1
      }, {
        'title': '销量',
        'sortType': 2
      }, {
        'title': '价格',
        'sortType': 3
      }, {
        'title': '券价',
        'sortType': 4
      },
    ],
    goodsList: []
  },
  clickSortItem: function (e) {
    this.setData({
      'currentSortItem': e.currentTarget.dataset.index,
      'postData.pageNum': 1,
      "postData.sort": e.currentTarget.dataset.sortId
    });
    _getGoodsList(this.data.postData, (data) => {
      this.setData({
        'goodsList': data,
        'ui.scrollPosition': 0
      });
      console.log(data);
    })
  },
  clickGoodsItem: function (e) {
    console.log(JSON.stringify(this.data.goodsList[e.currentTarget.dataset.index]));
    wx.navigateTo({
      url: '/pages/details/details?' + 'data=' + encodeURIComponent(JSON.stringify(this.data.goodsList[e.currentTarget.dataset.index])),
    });
  },
  clickToTop: function (e) {
    this.setData({
      'ui.scrollPosition': 0
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
  scrollToBottomEvent: function (e) {
    this.data.postData.pageNum++;
    console.log(this.data.postData);
    _getGoodsList(this.data.postData, (data) => {
      let goodsList = this.data.goodsList.concat(data);
      this.setData({
        'goodsList': goodsList
      });
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    });
    this.setData({
      "initData":options,
      "ui.title": options.title
    });
    if (!utils.isNullOrEmpty(options.bgColor)) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: options.bgColor
      })
    }
    if (!utils.isNullOrEmpty(options.bgImage)) {
      this.setData({
        "ui.bgImage": options.bgImage
      });
    }
    let systemInfo = wx.getSystemInfoSync()
    this.setData({
      "ui.pageHeight": systemInfo.windowHeight,
      "ui.pagewidth": systemInfo.windowWidth
    });
    if (!utils.isNullOrEmpty(options.pID)) {
      this.setData({
        "postData.pID": options.pID,
        "postData.cID": options.cID,
        'postData.pageNum': 1,
        "postData.sort": 1
      });
    } else if (!utils.isNullOrEmpty(options.q)) {
      this.setData({
        "postData.q": options.q,
        'postData.pageNum': 1,
        "postData.sort": 1
      });
    }
    _getGoodsList(this.data.postData,(data)=>{
      this.setData({
        'goodsList':data
      });
    })
  },
  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: config.wxAppName + '-'+this.data.ui.title,
      path: '/pages/goodsList/goodsList?' + utils.jsonToQueryStr(this.data.initData),
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
function _getGoodsList(postData, callback) {
  if (!utils.isNullOrEmpty(postData.pID)) {
    request.getGoodsList(postData, (data) => {
      callback(data);
    })
  } else if (!utils.isNullOrEmpty(postData.q)) {
    request.searchGoods(postData, (data) => {
      callback(data);
    })
  }
}
