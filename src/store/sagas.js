import { takeEvery, put } from 'redux-saga/effects'
import { GET_INIT_LIST } from './actionTypes'
import { getInitListAction } from './actionCreators'
import axios from 'axios'

// [redux-saga目的: 实现把异步请求拆分到单独文件中处理诉求]
function* getInitList() {
    // console.log('abc')
    try {
        const res = yield axios.get('./list.json')
        const data = res.data.list
        const action = getInitListAction(data)
        yield put(action)
    } catch(e) {
        console.log('list.json 网络请求失败')
    } 
}

// generator 函数
function* mySaga() {
    // 通过 takeEvery方法,就可以捕获到每一次派发出来的action
    yield takeEvery(GET_INIT_LIST, getInitList);
    // 只要接收到 GET_INIT_LIST 类型的 action,就执行 getInitList 方法
}
  
export default mySaga;