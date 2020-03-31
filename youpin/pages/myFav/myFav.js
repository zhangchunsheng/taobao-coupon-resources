const utils = require('../../utils/util.js');
const config = require('../../config.js');
const qcloud = require('../../vendor/wafer-client-sdk-master/index')
const GoodsItem = require('../../template/goodsItem/index.js');
Page(Object.assign({}, GoodsItem, {
  data: {
    postData: {
      pageNum: 1
    },
    goodsList: []
  },
  onLoad: function (options) {
    let that=this;
    qcloud.post({
      url: config.service.favlist,
      data: this.data.postData
    }, (err, listResult)=>{
      that.setData({
        'goodsList': listResult.data.list
      });
      console.log(this.data.goodsList);
    });
    
  },
  clickGoodsItem: function (e) {
    wx.navigateTo({
      url: '/pages/details/details?' + 'data=' + encodeURIComponent(JSON.stringify(this.data.goodsList[e.currentTarget.dataset.index])),
    });
  },
  clickGoodsBtn: function (e) {
    qcloud.post({
      url: config.service.remove_collection_like,
      data: {
        auctionId: this.data.goodsList[e.currentTarget.dataset.index].auctionId
      },
    }, (err, removeResult)=>{
      if (removeResult.data.success) {
        let goodsList = this.data.goodsList;
        goodsList.splice(e.currentTarget.dataset.index, 1);
        this.setData({
          "goodsList": goodsList
        })
      }
      wx.showToast({
        title: removeResult.data.data,
        icon: 'none',
        duration: 1000
      })
    });
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function () {
    let that = this;
    let pageNum = this.data.postData.pageNum;
    this.setData({
      "postData.pageNum": pageNum + 1
    });
    qcloud.post({
      url: config.service.favlist,
      data: this.data.postData
    }, (err, listResult)=>{
      let goodsList = that.data.goodsList;
      that.setData({
        'goodsList': goodsList.concat(listResult.data.list)
      });
      console.log(that.data.goodsList);
    });
    
  }
}))