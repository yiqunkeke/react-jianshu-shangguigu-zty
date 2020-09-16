import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION} from './actionTypes'

// state 指的是：整个store仓库中存储的数据
const defaultState = {
    inputValue: '',
    list: []
}

// 【reducer返回的必须是一个函数】
//  函数中接收两个参数：第一个是state 数据，第二个action 是组件传递过来的值

// reducer的作用是什么：拿到当前的数据state和即将要做的这句话的内容action，并返回一个新的数据给store。
// store会拿到reducer返回的新的数据，替换掉老的数据【自动替换】

// reducer的限制：【可以接受 state,但是绝对不能修改state】
export default (state = defaultState, action) => {
    // console.log(state, action)

    if(action.type === CHANGE_INPUT_VALUE) {
        // 拷贝一份state
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }

    if(action.type === ADD_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        newState.inputValue = ''
        return newState
    }

    if(action.type === DELETE_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1)
        return newState
    }

    if(action.type === INIT_LIST_ACTION) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list = action.data
        return newState
    }

    return state
}