<template>
  <div class="index">
    <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="value" position="fixed" placeholder="请输入关键词/店铺/商品"></search>
    <!--类目滚动选择-->
    <scroller lock-y :scrollbar-x=false>
      <div class="box1">
        <div class="box1-item" v-for="item in types"><span @click="selectFun(item)">{{item}}</span></div>
      </div>
    </scroller>
    <!--商品列表-->
    <section id="m-social" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="content">
        <div v-for="item in indexProjects" class="mui-chaoshi-item mui-chaoshi-item-column">
          <a :href="item.my_url" class="mui-chaoshi-item-column-inner">
            <div class="img-wrapper">
                <img class="item-img " :src="item.img_url" />
                <div class="soldout-mark"></div>
            </div>
            <div class="item-main">
                <div class="item-info">
                    <h3 class="item-title">{{item.tittle}}</h3>
                </div>
                <div class="item-imp">
                    <div class="imp-main">
                        <div class="item-sales"></div>
                        <div class="item-price">
                            <b class="promotion-price">{{item.first_price}}</b>
                        </div>
                    </div>
                </div>
            </div>
          </a>
        </div>
        <div class="clearfix"></div>
        <div v-if="this.indexProjects.length == 0" class="tc">
          没有数据啦
        </div>
      </div>
    </section>
    <toast v-model="showToast">已加载全部数据</toast>

    <loading v-model="isShowLoading" :text="textLoading"></loading>

    <alert v-model="isShowAlert" :title="AlertCongratulations" > {{ alertMessage }}</alert>
  </div>
</template>
<style lang="less">
  @import '../assets/css/index.less';
</style>
<script charset="UTF-8">
  import { Scroller, Search, Toast, Loading, Alert  } from 'vux'
  import InfiniteScroll from 'vue-infinite-scroll'
  import { mapGetters } from 'vuex'
  export default{
     computed:{
       ...mapGetters({
          indexProjects: 'getIndexProjects',
          lastId: 'getLastId'
        })
      },
    directives: {InfiniteScroll},
    mounted () {

    },
    data () {
      return {
        results: [],
        types:["","五元购","生活","男士","女士","数码"],
        value: '',
        type: '',
        busy: false,
        showToast: false,
        isShowAlert: false,
        AlertCongratulations: '条件有误',
        alertMessage: '123456',
        isShowLoading: false,
        textLoading: '加载中'
      }
    },
    components: {
      Search,
      Scroller,
      Toast,
      Loading,
      Alert
    },
    methods: {
      selectFun (value) {
        this.isShowLoading = true
        this.type = value
        this.$store.dispatch('fetchIndexClickLists',{pms: `{"type":"${value}"}`})
        this.isShowLoading = false
      },
      resultClick (item) {
        this.$store.dispatch('fetchIndexClickLists',{pms: `{"key_world":"${item.title}"}`})
        this.type = ''
      },
      getResult (val) {
        this.results = val ? getResult(this.value) : []
      },
      loadMore(){
        this.busy = true
        this.isShowLoading = true
        this.$store.dispatch('fetchIndexSelectLists',{pms: `{"type":"${this.type}","last_id":"${this.lastId}"}`})
        this.busy = false
        this.isShowLoading = false
      }
    }
  }

function getResult (val) {
  let rs = []
    rs.push({
      title: `${val}`
    })
  return rs
}
</script>
