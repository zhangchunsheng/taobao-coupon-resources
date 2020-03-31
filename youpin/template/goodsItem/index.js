module.exports={
  _clickGoodsItem:function(e){
    if (this.clickGoodsItem) {
      this.clickGoodsItem(e);
    } else {
      console.warn('当前页面没有ClickGoodsItem方法')
    }
  },
  _clickGoodsBtn: function (e) {
    if (this.clickGoodsBtn) {
      this.clickGoodsBtn(e);
    } else {
      console.warn('当前页面没有_clickGoodsBtn方法')
    }
  },
}