var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    tabs: {
      type: Array,
      value: [],
    },
    color:{
      type: String,
      value:''
    }
  },
  data: {
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    slidewidth:0,
  },
  ready: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        let slidewidth = (res.windowWidth / that.data.tabs.length);
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - slidewidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          slidewidth: slidewidth
        });
      }
    });
  },
  methods: {
    tabClick: function (e) {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
      var myEventDetail = {
        activeIndex: e.currentTarget.id
      } // detail对象，提供给事件监听函数
      var myEventOption = {
      } // 触发事件的选项
      this.triggerEvent('tabchange-event', myEventDetail, myEventOption);
    }
  }
});