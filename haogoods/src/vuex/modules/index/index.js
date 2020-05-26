/* 
* @Author: zhongwenbin
* @Date:   2017-02-04 17:51:12
* @Last Modified by:   zhongwenbin
* @Last Modified time: 2017-02-04 18:14:43
*/

import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
    indexProjects: {
       lastId: '',
       busy: 1,
       array: []
    },
    busy: false,
}


export default{
    state,
    actions,
    getters,
    mutations
}