// Redux学习
import React from 'react'; 
import ReactDOM from 'react-dom';

import TodoList02 from './TodoList02';

ReactDOM.render(
    <TodoList02 />,
  document.getElementById('root')
);

//#region 【Redux 概念简述】
// 设计理念 ： 组件----> store ---->其他组件
// Redux = Reducer + Flux
// Flux 框架：官方推出的最原始的数据辅助型框架（为了辅助React框架）   缺点：多个store
// Flux升级 --> Redux （融合了Reducer）
//#endregion

//#region 【Redux的工作流程】
// Redux就是一个数据型框架：
//  Store     React Components       Action Creators       Reducers
// [管理员]      [借书的人]          [要借什么书] 这句话     [记录本]
// 管理员需要通过查询记录本，才能找到你要找的书。
// 所以，创建Store同时，需要创建并引入reducer。才算完整的创建好了仓库。
//#endregion

//#region 【使用antDesign实现todolist界面】
// 1.安装 antDesign：
// npm install antd --save
// 2.引入样式：
// import 'antd/dist/antd.css';
// 3.使用组件：
// import { Input } from 'antd';
//  <Input placeholder="todo info" style={{width: '300px', marginRight: '10px'}}/>
//#endregion

//#region 【使用Redux】
// 1.安装Redux
// npm install --save redux


// 2.创建笔记本    [把笔记本给store]
// 新建 store/reducer.js:
// state 指的是：整个store仓库中存储的数据
// 【reducer返回的必须是一个函数】
// 函数中接收两个参数：第一个是state 当前数据，第二个action是组件传递过来的这句话
// const defaultState = {
//     inputValue: '1234',
//     list: [1,2,3]
// }
// export default (state = defaultState, action) => {
//     return state
// }

// 【reducer的作用是：拿到当前的数据state和即将要做的这句话的内容action，并返回一个新的数据给store。】



// 3.创建store  [管理员] 并把 reducer交给 store
// 新建 store/index.js：
// import { createStore } from 'redux'
// import reducer from './reducer' // 引入笔记本
// const store = createStore(reducer) // 把笔记本交给管理员
// export default store

// 【store会拿到reducer返回的新的数据，自动替换掉老的数据【自动执行】】


// 4. 组件中获取store中的数据，并订阅store       [订阅store，就可以自动感知store中数据的变化，更新组件]
// import store from './store'  // 引入store
// 在 constructor 中：
// this.state = store.getState()
// store.subscribe(this.handleStoreChange)  // 组件订阅store

// handleStoreChange = () => {
    // this.setState(store.getState()) 
// }
//#endregion

//#region 【Redux知识点复习补充】
// 1. store 必须是唯一的 
// 2. 只有store能够改变自己的内容
//    【reducer是拿到之前store中的数据，然后生成新的数据，然后把新的数据返回给了store。store拿到新的数据之后，自动更新替换掉旧数据】
//    【所以，store中的数据不是reducer更新的，而是 store在从reducer拿到新数据后，自己对自己进行更新】
//     【所以，只有store能够改变自己的内容。也是为什么 reducer 一定不能改变store中的内容】
// 3. reducer 必须是纯函数
//  纯函数：给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
//  比如如果有new Date(),setTimeout或ajax请求参与函数计算，就不是固定输出，就不再是纯函数.
//  比如，对参数进行了修改，说明此函数有副作用
//#endregion

//#region 【复习Redux中核心API】
// 4.createStore() ---帮助创建store
// 5.store.dispatch()---派发action,将这个action传递给store
// 6.store.getState()---帮助获取到store中所有的数据内容
// 7.store.subscribe()---可以订阅store的改变，只要store发生改变, store.subscribe(callback)中的callback就会执行。
//#endregion

//#region 【UI组件和容器组件】
// UI组件：负责页面的渲染---傻瓜组件--只负责界面的显示 TodoList02UI.js
// 容器组件：负责页面的逻辑 --- TodoList02.js 只关注业务逻辑
//#endregion

//#region 【无状态组件】
// 【无状态组件】：只有一个render()
// 【优势：性能比较高，因为它就是一个函数】
// 【有状态组件：包含生命周期函数，还要执行render】
// 【耗费性能】
// 【建议：如果一个组件只有一个render函数，建议用无状态组件，这样性能更高】
// 【UI组件通常用无状态组件，但也不是绝对。UI组件也可以进行简单的逻辑。】
//#endregion

//#region 【Redux中发送异步请求获取数据】
//#endregion

//#region 【Redux-thunk中间件进行ajax请求发送】
// 遇到异步请求或者复杂的逻辑，希望移到其他地方统一管理。
// redux-thunk中间件可以使【得把异步请求或复杂逻辑，移到 action 中去处理】
// redux-thunk 是 redux的中间件。

// https://github.com/reduxjs/redux-thunk

// 1.安装 npm install redux-thunk
// 2.使用
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

//#endregion

//#region 【到底什么是Redux中间件？】
// redux-thunk 中间件：就是对dispacth方法进行升级
// 以前dispatch方法只能接收对象，升级后可以接收函数

// Redux中间件有很多： 
// Redux-logger 
// Redux-saga 单独把异步拆分到一个文件中去管理
//#endregion

//#region 【Redux-saga中间件的使用】
// 再次强调：Redux 中间件，指的是 action 与 store 的中间。只有Redux 才有 action和store的概念。
// 注意，不是 react 的中间件，而是redux 中间件
// 
// 使用 redux-thunk 中间件，我们把异步请求统一放到 action中管理。有助于我们做自动化测试。
// redux-saga 也是做异步处理的中间件。
// 在React 中，大部分会用　redux-thunk 或 redux-saga ，学会这两个，基本可以快速上手react 项目。

// https://github.com/redux-saga/redux-saga
//#endregion

