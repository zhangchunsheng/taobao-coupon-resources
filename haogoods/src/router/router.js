/* 
* @Author: zhongwenbin
* @Date:   2016-11-07 10:36:14
* @Last Modified by:   zhongwenbin
* @Last Modified time: 2016-12-29 19:17:40
*/
export default [{
  path: '/',
  name: 'index',
  component: (resolve) => {
    require(['../page/index'], resolve)
    }
}, {
  path: '/detail/:id',
  name: 'index-detail',
  component: require('../page/indexDetail')
}]