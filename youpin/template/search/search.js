module.exports={
  _searchInputEvent:function(e){
    if (this.searchInputEvent){
      this.searchInputEvent(e);
    }else{
      console.log('当前页面没有_searchInputEvent')
    }
  }
}