module.exports = {
  _clickToTop: function (e) {
    if (this.clickToTop) {
      this.clickToTop(e);
    } else {
      console.warn("当前页面没有clickToTop方法")
    }
  }
}