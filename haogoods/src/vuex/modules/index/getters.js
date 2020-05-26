/* 
* @Author: zhongwenbin
* @Date:   2017-02-04 17:49:40
* @Last Modified by:   zhongwenbin
* @Last Modified time: 2017-02-04 17:50:34
*/
export function getIndexProjects (state){
    return state.indexProjects.array;
}

export function getLastId (state){
    return state.indexProjects.lastId;
}

export function noDataBusy (state){
    return state.indexProjects.busy;
}