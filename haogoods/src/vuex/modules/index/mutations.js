/* 
* @Author: zhongwenbin
* @Date:   2017-02-04 17:45:48
* @Last Modified by:   zhongwenbin
* @Last Modified time: 2017-02-06 11:09:53
*/
import {
    FETCH_INDEX_SUCCESS,
    FETCH_INDEX_SELECT_SUCCESS
} from './mutation-type.js'

const mutations = {
    //获取首页的产品列表
    [FETCH_INDEX_SUCCESS] (state, data) {
        state.indexProjects.array = data.array
        let listArr = state.indexProjects.array
        if(listArr.length > 0){
        state.indexProjects.lastId = listArr[listArr.length-1].goods_id
        }
    },
    [FETCH_INDEX_SELECT_SUCCESS] (state, data) {
            state.indexProjects.array = state.indexProjects.array.concat(data.array)
            let listArr = data.array
            state.indexProjects.lastId = listArr[listArr.length-1].goods_id
        
    }
}

export default mutations