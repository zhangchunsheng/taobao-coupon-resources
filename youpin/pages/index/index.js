const GoodsItem = require('../../template/goodsItem/index.js');
const Channel = require('../../template/channel/channel.js');
const Swiper = require('../../template/swiper/swiper.js');
const LumpShow = require('../../template/lumpshow/lumpshow.js');
const utils = require('../../utils/util.js');
const config = require('../../config.js');
const request = require('../../utils/request.js');
const Zan = require('../../dist/index');
const $ = require('../../vendor/wafer-client-sdk-master/index');
Page(Object.assign({}, GoodsItem, Channel, Swiper, LumpShow, Zan.NoticeBar, {
  data: {
    "userInfo": {},
    e:'',
    notice: {
      hidden: true,
      text: ''
    },
    host: config.service.host,
    timeLoop: null,
    postData: {
      "pID": 1001,
      "pageNum": 1,
      "sort": 4
    },
    timeData: {
      h: '00',
      m: '00',
      s: '00',
    },
    //频道
    channel: [],
    //精品推荐
    recommend: [],
    //轮播
    swiper: [],
    //节目
    programme: [],
    goodsList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request.get('/api/config', (data) => {
      getApp().config = data
      this.setData({
        channel: getApp().config.channel,
        recommend: getApp().config.recommend,
        swiper: getApp().config.swiper,
        programme: getApp().config.programme,
      });
      this.setData({
        "postData.pID": this.data.recommend[0].channelID
      });
      request.getGoodsList(this.data.postData, (data) => {
        this.setData({
          "goodsList": data
        });
      });
    });
    if (options.e) {
      console.log(config.service.userUrl + '?e=' + options.e);
      this.setData({
        e: options.e
      });

    }
  },
  onShow: function () {
    if(this.data.e!=''){
      $.get({
        url: config.service.userUrl + '?e=' + this.data.e,
        login: true
      }, (err, userInfo) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(userInfo);
      });
    }
    request.get('/api/config', (data) => {
      getApp().config = data
      let cVer = config.version;
      let sVer = getApp().config.wxAppUI.version.text;
      let result = utils.isSameVersion(sVer, cVer)
      if (result == 0) {//服务器和客户端版本相同
        this.setData({
          notice: getApp().config.wxAppUI.notice
        });
        this.initZanNoticeBarScroll('notice');
      }
      if (result == 1) {//服务器和客户端版本相同
        this.setData({
          notice: {
            "hidden": false,
            "text": "通知：本小程序只提供商品详情及优惠卷价格的展示功能，不提供领取优惠卷功能！"
          }
        });
        this.initZanNoticeBarScroll('notice');
      }
    });
    let timeData = getTimeData(getTopBarData()[1].timeNum);
    this.setData({
      'timeData.h': timeData.h,
      'timeData.m': timeData.m,
      'timeData.s': timeData.s
    });

    clearInterval(this.data.timeLoop);
    this.data.timeLoop = setInterval(() => {
      let timeData = getTimeData(getTopBarData()[1].timeNum);
      this.setData({
        'timeData.h': timeData.h,
        'timeData.m': timeData.m,
        'timeData.s': timeData.s
      })
    }, 1000);
  },
  onReachBottom: function () {
    let pageNum = this.data.postData.pageNum;
    pageNum++;
    this.setData({
      "postData.pageNum": pageNum
    });
    request.getGoodsList(this.data.postData, (data) => {
      this.setData({
        "goodsList": this.data.goodsList.concat(data)
      });
      console.log(data)
    });
  },
  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: config.wxAppName + `-积分换商品`,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res);
      }
    }
  },
  clickGoodsItem: function (e) {
    wx.navigateTo({
      url: '/pages/details/details?' + 'data=' + encodeURIComponent(JSON.stringify(this.data.goodsList[e.currentTarget.dataset.index])),
    });
  },
  clickChannelItem: function (e) {
    let channelItem = this.data.channel[e.currentTarget.dataset.index];
    let postData = {
      "pID": channelItem.channelID,
      "cID": channelItem.channelID,
      "pageNum": 1,
      "sort": 1,
      "title": channelItem.title,
      "bgImage": config.service.host + channelItem.bgImage,
      "bgColor": channelItem.bgColor
    };
    console.log(postData);
    wx.navigateTo({
      url: '/pages/goodsList/goodsList?' + utils.jsonToQueryStr(postData),
    })
  },
  clickSwiperItem: function (e) {
    let index = e.currentTarget.dataset.index;
    let item = this.data.swiper[index].data;
    let salePrice = item.zkPrice - item.couponAmount;
    if (salePrice.toString().split('.').length == 2) {
      item.salePrice = salePrice.toFixed(2);
    } else {
      item.salePrice = salePrice;
    }
    wx.navigateTo({
      url: '/pages/details/details?' + 'data=' + encodeURIComponent(JSON.stringify(item)),
    });
  },
  clickLumpItem: function (e) {
    let channelItem = this.data.programme[e.currentTarget.dataset.index];
    let postData = {
      "pID": channelItem.channelID,
      "cID": channelItem.channelID,
      "pageNum": 1,
      "sort": 1,
      "title": channelItem.title,
      "bgImage": utils.isNullOrEmpty(channelItem.bgImage) ? '' : config.service.host + channelItem.bgImage,
      "bgColor": channelItem.bgColor
    };
    console.log(postData);
    if (e.currentTarget.dataset.index == 0) {
      wx.switchTab({
        url: '/pages/choice/choice'
      });
    } else {
      wx.navigateTo({
        url: '/pages/goodsList/goodsList?' + utils.jsonToQueryStr(postData),
      });
    }

  },
  clickSearchBar: function (e) {
    wx.navigateTo({
      url: '/pages/searchPage/searchPage',
    });
  }
}))
function getTopBarData() {
  let data = [{
    "time": "00:00",
    "timeNum": 24,
    "id": 0,
    "text": "即将开始"
  }, {
    "time": "06:00",
    "timeNum": 6,
    "id": 1,
    "text": "即将开始"
  }, {
    "time": "08:00",
    "timeNum": 8,
    "id": 2,
    "text": "即将开始"
  }, {
    "time": "10:00",
    "timeNum": 10,
    "id": 3,
    "text": "即将开始"
  }, {
    "time": "12:00",
    "timeNum": 12,
    "id": 4,
    "text": "即将开始"
  }, {
    "time": "14:00",
    "timeNum": 14,
    "id": 5,
    "text": "即将开始"
  }, {
    "time": "16:00",
    "timeNum": 16,
    "id": 6,
    "text": "即将开始"
  }, {
    "time": "18:00",
    "timeNum": 18,
    "id": 7,
    "text": "即将开始"
  }, {
    "time": "20:00",
    "timeNum": 20,
    "id": 8,
    "text": "即将开始"
  }, {
    "time": "22:00",
    "timeNum": 22,
    "id": 9,
    "text": "即将开始"
  }, {
    "time": "00:00",
    "timeNum": 24,
    "id": 0,
    "text": "即将开始"
  }, {
    "time": "06:00",
    "timeNum": 6,
    "id": 1,
    "text": "即将开始"
  }, {
    "time": "08:00",
    "timeNum": 8,
    "id": 2,
    "text": "即将开始"
  }, {
    "time": "10:00",
    "timeNum": 10,
    "id": 3,
    "text": "即将开始"
  }, {
    "time": "12:00",
    "timeNum": 12,
    "id": 4,
    "text": "即将开始"
  }, {
    "time": "14:00",
    "timeNum": 14,
    "id": 5,
    "text": "即将开始"
  }, {
    "time": "16:00",
    "timeNum": 16,
    "id": 6,
    "text": "即将开始"
  }, {
    "time": "18:00",
    "timeNum": 18,
    "id": 7,
    "text": "即将开始"
  }, {
    "time": "20:00",
    "timeNum": 20,
    "id": 8,
    "text": "即将开始"
  }, {
    "time": "22:00",
    "timeNum": 22,
    "id": 9,
    "text": "即将开始"
  }];
  let date = new Date();
  let h = date.getHours();
  let topBarData = [];
  for (let i = 0; i < data.length; i++) {
    if (h >= data[i].timeNum && h < data[i + 1].timeNum) {
      for (let j = 0; j < 4; j++) {
        if (j == 0) {
          data[i].text = "抢购中";
        }
        topBarData.push(data[i + j]);
      }
      break;
    }
  }
  return topBarData;
}
function getTimeData(timeH, showType = 0) {
  let timeS = 60000 * 60 * timeH;
  let date = new Date();
  let hS = date.getHours() * 60000 * 60;
  let mS = date.getMinutes() * 60000;
  let sS = date.getSeconds() * 1000;
  let sAll = timeS - (hS + mS + sS);
  if (timeS > (hS + mS + sS)) {
    sAll = timeS - (hS + mS + sS);
  } else if (timeS < (hS + mS + sS)) {
    sAll = (timeS + 60000 * 60 * 24) - (hS + mS + sS);
  }
  let timeData = {}
  let h = Math.floor(sAll / (60000 * 60));
  let m = Math.floor((sAll % (60000 * 60)) / 60000);
  let s = Math.floor(((sAll % (60000 * 60)) % 60000) / 1000);
  timeData.h = h / 10 < 1 ? '0' + h.toString() : h.toString();
  timeData.m = m / 10 < 1 ? '0' + m.toString() : m.toString();
  timeData.s = s / 10 < 1 ? '0' + s.toString() : s.toString();
  return timeData;
}