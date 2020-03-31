const Grid = require('../../template/grid/index.js');
const request = require('../../utils/request.js');
const utils = require('../../utils/util.js');
const config = require('../../config.js');
Page(Object.assign({}, Grid, {
  data: {
    ui: {
      title: ''
    },
    category: []
  },
  clickGridItem: function (e) {
    //

    let itemData = this.data.category.children[e.currentTarget.dataset.index];
    let postData = {
      "pID": itemData.pID,
      "cID": itemData.cID,
      "pageNum": 1,
      "sort": 1,
      "title": itemData.title
    };
    wx.navigateTo({
      url: '/pages/goodsList/goodsList?' + utils.jsonToQueryStr(postData),
    })
  },
  onLoad: function (options) {
    try {
      this.setData({
        "initData": options.data,
        "category": JSON.parse(options.data)
      });
      this.setData({
        "ui.title": this.data.category.title
      })
      wx.setNavigationBarTitle({
        title: this.data.category.title
      })
    } catch (e) {
      console.log(e);
    }
    console.log(options);
    console.log(this.data.initData);
  },
  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    console.log(this.data.initData);
    return {
      title: config.wxAppName + '-' + this.data.ui.title,
      path: '/pages/subcategory/subcategory?data=' + this.data.initData,
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