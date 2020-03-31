const TopBar = require('./topbar/topbar.js');
const request = require('../../utils/request.js');
const GoodsItem = require('../../template/goodsItem/index.js');
const config = require('../../config.js');
Page(Object.assign({}, TopBar, GoodsItem, {
  data: {
    selectId: 0,
    channelID: 0,
    timeLoop: null,
    timeData: {
      h: '00',
      m: '00',
      s: '00',
      tagTitle: '',
      timeTitle: ''
    },
    topbarData: [],
    goodsList: []
  },
  clickTopBarItem: function (e) {
    this.setData({
      selectId: e.currentTarget.dataset.index
    })
    let index = this.data.selectId;
    let postData = {
      "pID": this.data.channelID,
      "pageNum": this.data.topbarData[index].id + 1,
      "sort": 1
    }
    console.log(postData);
    request.getGoodsList(postData, (data) => {
      this.setData({
        "goodsList": data
      });
      console.log(data)
    });
    let showType = 1;
    if (index == 0) {
      index += 1;
      showType = 0;
    }
    let timeData = getTimeData(this.data.topbarData[index].timeNum, showType);
    if (showType == 0) {
      timeData.tagTitle = '秒杀中 先下单先得哦';
      timeData.timeTitle = '距结束';
    } else {
      timeData.tagTitle = '即将开场 先下单先得哦';
      timeData.timeTitle = '距开始';
    }
    this.setData({
      'timeData': timeData
    })

  },
  clickGoodsItem: function (e) {
    if (this.data.selectId == 0) {
      wx.navigateTo({
        url: '/pages/details/details?' + 'data=' + encodeURIComponent(JSON.stringify(this.data.goodsList[e.currentTarget.dataset.index])),
      });
    } else {
      wx.showToast({
        title: '活动未开始',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    this.setData({
      'topbarData': getTopBarData(),
      "channelID": getApp().config.rushToBuy[0].channelID
    });
    let timeData = getTimeData(this.data.topbarData[this.data.selectId == 0 ? this.data.selectId + 1 : this.data.selectId].timeNum);
    this.setData({
      'timeData.h': timeData.h,
      'timeData.m': timeData.m,
      'timeData.s': timeData.s,
      'timeData.tagTitle': '秒杀中 先下单先得哦',
      'timeData.timeTitle': '距结束'
    })
    clearInterval(this.data.timeLoop);
    this.data.timeLoop = setInterval(() => {
      let timeData = getTimeData(this.data.topbarData[this.data.selectId == 0 ? this.data.selectId + 1 : this.data.selectId].timeNum);
      this.setData({
        'timeData.h': timeData.h,
        'timeData.m': timeData.m,
        'timeData.s': timeData.s
      })
    }, 1000);
    let postData = {
      "pID": this.data.channelID,
      "pageNum": this.data.topbarData[this.data.selectId].id + 1,
      "sort": 1
    }
    console.log(postData);
    request.getGoodsList(postData, (data) => {
      this.setData({
        "goodsList": data
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
      title: config.wxAppName+'-限时秒杀',
      path: '/pages/choice/choice',
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