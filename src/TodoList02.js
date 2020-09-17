import React, { Component } from 'react'
import 'antd/dist/antd.css';
import store from './store'  // 引入store
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, getInitList } from './store/actionCreators'
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
        // 方案1.[直接在组件中写异步请求]
        // axios.get('./list.json')
        // .then((res) => {
        //     const data = res.data.list
        //     const action = getInitListAction(data)
        //     store.dispatch(action)
        // })
        // .catch(()=>{
        //     console.log('fail')
        // })

        // 方案2.[使用 redux-thunk中间件，发送异步请求]
        // 【重点】
        // 之所以,这里可以把一个函数通过dispatch传递给store,就是因为你使用了redux-thunk.
        // 默认情况下,action必须是一个对象.如果你不使用redux-thunk,直接在这里传递一个函数,就会报错.
        // 当store发现dispatch进来的是一个函数时,就会自动执行这个函数.
        // 当把action【注意，这里的action不再是对象，而是函数】dispatch发给store时，这个action会自动执行
        // action就是 getTodoList函数的返回值，也是一个函数
        // const action = getTodoList()
        // store.dispatch(action) 

        // 方案3.[使用redux-saga 将异步请求放到sagas.js文件中,单独统一处理]
        // 默认, store可以接收到 action, 并转发给reducer,在reducer中可以拿到action
        // 使用了 redux-saga之后, 在 sagas.js 文件中也可以拿到action
        const action = getInitList()
        store.dispatch(action)
        
        
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