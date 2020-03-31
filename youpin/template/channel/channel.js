module.exports ={
  _clickChannelItem:function(e){
    if(this.clickChannelItem){
      this.clickChannelItem(e);
    }else{
      console.warn("当前页面还没有添加_clickChannelItem()")
    }
  }
}