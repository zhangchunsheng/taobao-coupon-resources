const Grid = require('../../template/grid/index.js');
const utils = require('../../utils/util.js');
const config = require('../../config.js')
Page(Object.assign({}, Grid, {
  data: {
    "category": []
  },
  clickGridItem: function (e) {

    let categoryItem = this.data.category[e.currentTarget.dataset.index];
    if (categoryItem.children.length > 0) {
      let data = JSON.stringify(categoryItem);
      wx.navigateTo({
        url: '/pages/subcategory/subcategory?data=' + data,
      });
    }else{
      let postData = {
        "pID": categoryItem.channelID,
        "cID": categoryItem.channelID,
        "pageNum": 1,
        "sort": 1,
        "title": categoryItem.title
      };
      wx.navigateTo({
        url: '/pages/goodsList/goodsList?' + utils.jsonToQueryStr(postData),
      })
    }
  },
  clickSearchBar: function (e) {
    wx.navigateTo({
      url: '/pages/searchPage/searchPage',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "category": getApp().config.category
    });
  },
  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: config.wxAppName+'-商品分类',
      path: '/pages/search/search',
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