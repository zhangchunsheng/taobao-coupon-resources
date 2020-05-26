// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import store from './vuex/store'
import routerConfig from './router/router'
import App from './App'


const FastClick = require('fastclick')
FastClick.attach(document.body)
//开启debug模式
//Vue.config.debug = true
//window.log = console.log

Vue.use(Router)
const router = new Router({mode: 'history',routes: routerConfig})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

