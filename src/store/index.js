// 创建并导出一个store(数据的公共存储仓库)
// import { createStore, applyMiddleware } from 'redux'
import { createStore } from 'redux'
import reducer from './reducer' // 引入笔记本
// import thunk from 'redux-thunk'; // 中间件：通过redux创建store的时候使用redux-thunk中间
// 【所以再次强调，这是redux的中间件，不是react的中间件】

// import createSagaMiddleware from 'redux-saga'
// import mySaga from './sagas'

// const store = createStore(reducer, applyMiddleware(thunk))  // 把笔记本交给管理员 === 【把reducer（作为第一个参数）传递给store】 --现在store就可以通过reducer知道仓库中有哪些数据

// const sagaMiddleware = createSagaMiddleware()
// const store = createStore(reducer, applyMiddleware(sagaMiddleware)) 
// sagaMiddleware.run(mySaga)

const store = createStore(reducer)

export default store
