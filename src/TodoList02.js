import React, { Component } from 'react'
import 'antd/dist/antd.css';
import store from './store'  // 引入store
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, getInitListAction, getTodoList } from './store/actionCreators'
import TodoList02UI from './TodoList02UI'

class TodoList02 extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        store.subscribe(this.handleStoreChange) // 组件订阅store
    }

    render() {
        return (
            <TodoList02UI 
                inputValue={this.state.inputValue}
                list={this.state.list}
                handleInputChange={this.handleInputChange}
                handleBtnClick={this.handleBtnClick}
                handleItemDelete={this.handleItemDelete}>
            </TodoList02UI>
        )
    }

    componentDidMount() {
        // axios.get('./list.json')
        // .then((res) => {
        //     const data = res.data.list
        //     const action = getInitListAction(data)
        //     store.dispatch(action)
        // })
        // .catch(()=>{
        //     console.log('fail')
        // })

        const action = getTodoList()
        // console.log(action)
        store.dispatch(action) 
        // 当把action【注意，这里的action不再是对象，而是函数】dispatch发给store时，这个action会自动执行
        // action就是 getTodoList函数的返回值，也是一个函数
    }

    handleInputChange = (e) => {
        // console.log(e.target.value)

        // 1. 创建Action
        // [相当于说：我现在要做一件事，这件事是'change_input_value', 改变后的值是value: e.target.value]
        // const action = {
        //     type: CHANGE_INPUT_VALUE,
        //     value: e.target.value
        // }

        const action = getInputChangeAction(e.target.value)

        // 2. 把上面的话传给store
        store.dispatch(action)

        // 3. store 需要查询 reducer 做处理
        // store 会拿 previousState和action 去查询 reducer 手册 
        // store 会把 previousState和action 一起转发给 reducer【redux会自动转发】, reducer来告诉store来做什么


    }

    handleStoreChange = () => {
        this.setState(store.getState()) 
    }

    handleBtnClick = () => {
        // const action = {
        //     type: ADD_TODO_ITEM
        // }
        const action = getAddItemAction()
        store.dispatch(action)
    }

    handleItemDelete = (index) => {
        console.log(index)
        // const action = {
        //     type: DELETE_TODO_ITEM,
        //     index: index
        // }
        const action = getDeleteItemAction(index)
        store.dispatch(action)
    }
}

export default TodoList02

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
