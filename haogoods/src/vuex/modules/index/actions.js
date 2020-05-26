/* 
* @Author: zhongwenbin
* @Date:   2017-02-04 15:04:01
* @Last Modified by:   zhongwenbin
* @Last Modified time: 2017-02-23 16:52:08
*/
import vue from 'vue';
import axios from 'axios';
var qs = require('qs');


// 使用代理
const HOST = '/api';


/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
const _get = ({ url, query }, commit) => {
    //if (commit) commit('START_LOADING')
    let _url
    if (query) {
        _url = `${url}?${query}`
    } else {
        _url = `${url}`
    }

    return axios.get(HOST + _url)
        .then(response => {
            //if (commit) commit('FINISH_LOADING')
            if (response.status >= 200 && response.status < 300) {
                return response.data
            }
            //return Promise.reject(new Error(response.status))
           })
}
/**
 * post请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
const _post = ({ url, query }, commit) => {
    //if (commit) commit('START_LOADING')
    let _url = `${url}`
    return axios({
            method: 'post',
            url: HOST + _url,
            data: qs.stringify(query)
                }).then(response => {
                //if (commit) commit('FINISH_LOADING')
                if (response.status >= 200 && response.status < 300) {
                    return response.data
                   }
        })
}

/**
 * 获取全部种类的首屏商品
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} options.url       首页资源数据地址
 * @return {Promise}                  Promise
 */
export const fetchIndexLists = ({ commit }) => {
  const url = 'app/controller/Select.php'
  const query = ''
  return _get({url, query}, commit)
    .then((json) => {
      if (json.res === 1) {

        return commit('FETCH_INDEX_SUCCESS', json)
      }
      //return Promise.reject(new Error('fetchIndexLists failure'))
    })
    .catch((error) => {
      // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
      return Promise.reject(error)
    })
}
/**
 * 获取不同种类的商品列表
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} options.url       分类资源数据地址
 * @return {Promise}                  Promise
 */
export const fetchIndexClickLists = ({ commit }, params) => {
  const url = 'app/controller/Select.php'
  const query = params
  return _post({url, query}, commit)
    .then((json) => {
      if (json.res === 1) {

        return commit('FETCH_INDEX_SUCCESS', json)
      }
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
/**
 * 获取不同种类的商品列表
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {String} options.url       分类资源数据地址
 * @return {Promise}                  Promise
 */
export const fetchIndexSelectLists = ({ commit }, params) => {
  const url = 'app/controller/Select.php'
  const query = params
  return _post({url, query}, commit)
    .then((json) => {
      if (json.res === 1) {

        return commit('FETCH_INDEX_SELECT_SUCCESS', json)
      }
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}