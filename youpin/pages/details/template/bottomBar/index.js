module.exports ={
  _clickHome:function(e){
    if (this.clickHome){
      this.clickHome(e);
    }else{
      console.warn('当前页面没有_clickHome方法')
    }
  },
  _clickShare: function (e) {
    if (this.clickShare) {
      this.clickShare(e);
    } else {
      console.warn('当前页面没有_clickShare方法')
    }
  },
  _clickFav: function (e) {
    if (this.clickFav) {
      this.clickFav(e);
    } else {
      console.warn('当前页面没有_clickFav方法')
    }
  },
  _clickPoint: function (e) {
    if (this.clickPoint) {
      this.clickPoint(e);
    } else {
      console.warn('当前页面没有_clickPoint方法')
    }
  },
  _clickCoupon: function (e) {
    if (this.clickCoupon) {
      this.clickCoupon(e);
    } else {
      console.warn('当前页面没有clickCoupon方法')
    }
  }
}