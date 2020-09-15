// 创建并导出一个store(数据的公共存储仓库)
import { createStore } from 'redux'
import reducer from './reducer' // 引入笔记本

const store = createStore(reducer)  // 把笔记本交给管理员 === 【把reducer（作为第一个参数）传递给store】 --现在store就可以通过reducer知道仓库中有哪些数据


export default store