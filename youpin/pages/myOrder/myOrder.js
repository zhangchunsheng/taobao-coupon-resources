const util = require('../../utils/util.js');
const config = require('../../config.js');
const $ = require('../../vendor/wafer-client-sdk-master/index')
const GoodsItem = require('../../template/goodsItem/index.js');
Page({
  data: {
    postData: {
      pageNum: 1
    },
    tabs: {
      data: ["全部", "待审核", "已付款", "已失效", "已完成"],
      color: '#ff93a5'
    },
    orders: []
  },
  tabChange: function (e) {
    let that= this;
    this.setData({
      'postData.pageNum': 1
    });
    let postData={};
    if (e.detail.activeIndex == 0) {
      postData=this.data.postData;
    } else if (e.detail.activeIndex == 1) {
      postData = {
        pageNum: this.data.postData.pageNum,
        payStatus: 1
      }
      
    } else if (e.detail.activeIndex == 2) {
      postData = {
        pageNum: this.data.postData.pageNum,
        payStatus: 2
      }
    }
    else if (e.detail.activeIndex == 3) {
      postData = {
        pageNum: this.data.postData.pageNum,
        payStatus: 3
      }
    }
    else if (e.detail.activeIndex == 4) {
      postData = {
        pageNum: this.data.postData.pageNum,
        payStatus: 4
      }
    }
    _getData(postData,(err,result)=>{
      that.setData({
        'orders': result
      });
    });
    
  },
  onLoad: function (options) {
    let that = this;
    
    _getData(this.data.postData, (err, result) => {
      console.log(result)
      that.setData({
        'orders': result
      });
    });
  },
  onReachBottom: function () {
    let that =this;
    let pageNum = this.data.postData.pageNum;
    this.setData({
      "postData.pageNum": pageNum + 1
    });
    _getData(this.data.postData, (err, listResult) => {
      let orders = that.data.orders;
      that.setData({
        'orders': orders.concat(listResult)
      });
      console.log(that.data.orders);
    });
    
  }

})
function _getData(postData,callback) {
  $.post({
    url: config.service.order_list,
    data: postData
  },(err,result)=>{
    for (let item of result.data.list) {
      item.addTime = util.formatDateTime(item.addTime);
      if (item.type == 1) {
        item.orderId = '订单号：' + item.orderId;
      }
    }
    if(err){
      console.log(err);
      return;
    }
    callback(null,result.data.list);
  });
  
  
}