module.exports={
  _clickTopBarItem:function(e){
    if(this.clickTopBarItem){
      this.clickTopBarItem(e);
    }else{
      console.warn("页面无clickTopBarItem")
    }
  }
}