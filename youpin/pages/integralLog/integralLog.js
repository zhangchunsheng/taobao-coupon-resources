const $ = require('../../vendor/wafer-client-sdk-master/index')
const util = require('../../utils/util.js');
const config = require('../../config.js');
Page({
  data: {
    postData: {
      pageNum: 1
    },
    tabs: {
      data: ["全部明细", "收入明细", "支出明细"],
      color: '#ff93a5'
    },
    logList: []
  },
  tabChange: function (e) {
    let that = this;
    this.setData({
      'postData.pageNum': 1
    });
    if (e.detail.activeIndex == 0) {
      _getLog(this.data.postData,(err,result)=>{
        that.setData({
          'logList': result
        });
      });
      
    } else if (e.detail.activeIndex == 1) {
      let postData = {
        pageNum: this.data.postData.pageNum,
        type: 1
      }
      _getLog(postData, (err, result) => {
        that.setData({
          'logList': result
        });
      });
    } else if (e.detail.activeIndex == 2) {
      let postData = {
        pageNum: this.data.postData.pageNum,
        type: -1
      }
      _getLog(postData, (err, result) => {
        that.setData({
          'logList': result
        });
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    _getLog(this.data.postData, (err, result) => {
      that.setData({
        'logList': result
      });
    });
  },
  onReachBottom: function () {
    let that = this;
    let pageNum = this.data.postData.pageNum;
    this.setData({
      "postData.pageNum": pageNum + 1
    });
    _getLog(this.data.postData, (err, result) => {
      let logList = this.data.logList;
      that.setData({
        'logList': logList.concat(result)
      });
    });
  }
})
function _getLog(postData,callback) {
  let result = $.post({
    url: config.service.integral_log,
    data: postData
  },(err,result)=>{
    for (let item of result.data) {
      item.addTime = util.formatDateTime(item.addTime);
    }
    if(err){
      console.log(err);
      return;
    }
    callback(null, result.data);
  });
  
}