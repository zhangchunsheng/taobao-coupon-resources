module.exports={
  _clickCoupon: function (e) {
    if (this.clickCoupon) {
      this.clickCoupon(e);
    } else {
      console.warn('当前页面没有clickCoupon方法')
    }
  }
}