module.exports = {
  _tabChange: function (e) {
    if (this.tabChange) {
      this.tabChange(e);
    } else {
      console.warn('当前页面没有tabChange方法')
    }
  }
}