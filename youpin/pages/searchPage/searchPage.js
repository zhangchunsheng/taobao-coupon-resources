const SearchBar = require('../../template/search/search.js');
const config = require('../../config.js')
const request = require('../../utils/request.js');
const utils = require('../../utils/util.js');
const historyKeywordName = 'historyKeyword';
Page(Object.assign({}, SearchBar, {
  data: {
    searchText: '',
    hotTagList: [],
    historyTagList: []
  },
  search: function (e) {
    if (this.data.searchText == '') {
      wx.showModal({
        title: '提示',
        content: '关键词不能为空！',
        showCancel: false,
        confirmText: '好的',
        confirmColor: '#ff93a5'
      })
    } else {
      if (this.data.historyTagList.indexOf(this.data.searchText) == -1) {
        let historyTagList = this.data.historyTagList;
        historyTagList.unshift(this.data.searchText);
        this.setData({
          "historyTagList": historyTagList
        });
        wx.setStorageSync(historyKeywordName, this.data.historyTagList);
      }
      let postData = {
        "q": this.data.searchText,
        "pageNum": 1,
        "sort": 1,
        "title": this.data.searchText+'-搜索'
      };
      wx.navigateTo({
        url: '/pages/goodsList/goodsList?' + utils.jsonToQueryStr(postData),
      })
    }
  },
  hotSearch: function (e) {
    
    let postData = {
      "q": this.data.hotTagList[e.currentTarget.dataset.index],
      "pageNum": 1,
      "sort": 1,
      "title": this.data.hotTagList[e.currentTarget.dataset.index]+'-搜索'
    };
    console.log(postData)
    wx.navigateTo({
      url: '/pages/goodsList/goodsList?' + utils.jsonToQueryStr(postData),
    })
  },
  historySearch: function (e) {
    let postData = {
      "q": this.data.historyTagList[e.currentTarget.dataset.index],
      "pageNum": 1,
      "sort": 1,
      "title": this.data.historyTagList[e.currentTarget.dataset.index]+'-搜索'
    };
    console.log(postData)
    wx.navigateTo({
      url: '/pages/goodsList/goodsList?' + utils.jsonToQueryStr(postData),
    })
  },
  searchInputEvent: function (e) {
    this.setData({
      'searchText': e.detail.value
    });
  },
  removeHistoryKeyword:function(e){
    wx.removeStorageSync(historyKeywordName);
    this.setData({
      "historyTagList":[]
    })
  },
  onLoad: function (options) {
    this.setData({
      "hotTagList":getApp().config.hotKeyword
    });
  },

  onShow: function () {
    this.setData({
      "searchText": ""
    });
    let historyKeyword = wx.getStorageSync(historyKeywordName);
    try {
      if (historyKeyword) {
        this.setData({
          "historyTagList": historyKeyword
        });
      }
    } catch (e) {

    }
    console.log(historyKeyword)
  },
}))