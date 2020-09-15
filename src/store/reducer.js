// state 指的是：整个store仓库中存储的数据
const defaultState = {
    inputValue: '1234',
    list: [1,2,3]
}

// reducer返回的必须是一个函数
//  函数中接收两个参数：第一个是state 数据，第二个action 是组件传递过来的值
export default (state = defaultState, action) => {
    console.log(state, action)
    // reducer的作用是什么
    // reducer的限制：【可以接受 state,但是绝对不能修改state】
    if(action.type==='change_input_value') {
        // 拷贝一份state
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }
    return state
}