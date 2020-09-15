import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store'  // 引入store

class TodoList02 extends Component {
    constructor(props) {
        super(props)
        // console.log(store.getState())
        this.state = store.getState()
        console.log(this.state)
    }

    render() {
        return (
            <div style={{marginTop: '10px', marginLeft: '10px'}}>
                <div>
                    <Input placeholder="todo info" 
                        value={this.state.inputValue} 
                        style={{width: '300px', marginRight: '10px'}}
                        onChange={this.handleIputChange}/>
                    <Button type="primary">提交</Button>
                </div>
                <List
                    style={{marginTop: '10px', width: '300px'}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                    />
            </div>
        )
    }

    handleIputChange = (e) => {
        console.log(e.target.value)

        // 1. 创建Action
        // [相当于说：我现在要做一件事，这件事是'change_input_value', 改变后的值是value: e.target.value]
        const action = {
            type: 'change_input_value',
            value: e.target.value
        }

        // 2. 把上面的话传给store
        store.dispatch(action)

        // 3. store 需要查询 reducer 做处理
        // store 会拿 previousState和action 去查询 reducer 手册 
        // store 会把 previousState和action 一起转发给 reducer【redux会自动转发】, reducer来告诉store来做什么


    }
}

export default TodoList02

// 【使用antDesign实现todolist界面】
// 1.安装 antDesign：
// npm install antd --save
// 2.引入样式：
// import 'antd/dist/antd.css';
// 3.使用组件：
// import { Input } from 'antd';
//  <Input placeholder="todo info" style={{width: '300px', marginRight: '10px'}}/>

// 【使用Redux】
// 1.安装Redux
// npm install --save redux


// 2.创建笔记本    [把笔记本给store]
// 新建 store/reducer.js:
// state 指的是：整个store仓库中存储的数据
// 【reducer返回的必须是一个函数】
// 函数中接收两个参数：第一个是state 数据
// const defaultState = {
//     inputValue: '1234',
//     list: [1,2,3]
// }
// export default (state = defaultState, action) => {
//     return state
// }

// 3.创建store  [管理员] 并把 reducer交给 store
// 新建 store/index.js：
// import { createStore } from 'redux'
// import reducer from './reducer' // 引入笔记本
// const store = createStore(reducer) // 把笔记本交给管理员
// export default store

