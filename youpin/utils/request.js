const config = require('../config.js');
const utils = require('../utils/util.js');
module.exports = {
  get: function (url, callback) {
    let cookie = wx.getStorageSync('cookie');
    wx.request({
      url: config.service.host + url, //仅为示例，并非真实的接口地址
      method: 'get',
      header: {
        'content-type': 'application/json',
        'clientid': 'wxapp',
        'cookie': cookie ? cookie : ''
      },
      success: function (res) {
        if (res.header['Set-Cookie']) {
          wx.setStorageSync('cookie', res.header['Set-Cookie'])
        } else if (res.header['set-cookie']) {
          wx.setStorageSync('cookie', res.header['set-cookie']);
        }
        callback(res.data);
      }
    })
  },
  post: function (url, postData, callback) {
    let cookie = wx.getStorageSync('cookie');
    wx.request({
      url: config.service.host + url, //仅为示例，并非真实的接口地址
      method: 'post',
      data: postData,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'clientid': 'wxapp',
        'cookie': cookie ? cookie : ''
      },
      success: function (res) {
        if (res.header['Set-Cookie']) {
          wx.setStorageSync('cookie', res.header['Set-Cookie'])
        } else if (res.header['set-cookie']) {
          wx.setStorageSync('cookie', res.header['set-cookie']);
        }
        callback(res.data);
      }
    })
  },
  getGoodsList: function (postData, callback) {
    this.post('/goods/list', utils.jsonToQueryStr(postData), (data) => {
      let list = [];
      for (let item of data) {
        let salePrice = item.zkPrice - item.couponAmount;
        if (salePrice.toString().split('.').length == 2) {
          if (salePrice.toString().split('.')[1].length > 2) {
            item.salePrice = salePrice.toFixed(2);
          } else {
            item.salePrice = salePrice;
          }
        } else {
          item.salePrice = salePrice;
        }
        let isExist = false;
        for (let listItem of list) {
          //列表有相同宝贝
          if (listItem.auctionId == item.auctionId) {
            isExist = true;
            break;
          }
        }
        if (isExist == false) {
          list.push(item);
        }
      }
      callback(list);
    })
  },
  searchGoods: function (postData, callback) {
    this.post('/goods/search', utils.jsonToQueryStr(postData), (data) => {
      callback(data);
    });
  },
}