// 使用 actionCreators 统一创建 action
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION, GET_INIT_LIST } from './actionTypes'
// import axios from 'axios'

export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
})

export const getAddItemAction = () => ({
    type: ADD_TODO_ITEM
})

export const getDeleteItemAction = (index) => ({
    type: DELETE_TODO_ITEM,
    index
})

export const getInitListAction = (data) => ({
    type: INIT_LIST_ACTION,
    data
})

//#region 
// 使用了 redux-thunk中间件，则 actionCreators中返回的就可以是函数
// 在返回的函数中作异步操作
// actionCreators中永远导出的是一个个action，action函数中默认返回的是对象
// 只不过使用了 redux-thunk 之后，action返回的可以不仅仅是对象了，返回的可以是函数
// redux-thunk使得我们支持action返回是函数的这种形式

// export const getTodoList = () => {
//     return (dispatch) => {
//         axios.get('./list.json')
//         .then((res) => {
//             const data = res.data.list
//             // console.log(data)
//             const action = getInitListAction(data)
//             dispatch(action)
//         })
//         .catch(()=>{
//             console.log('fail')
//         })
//     }
// }
//#endregion

//#region 
export const getInitList = () => ({
    type: GET_INIT_LIST
})
// 提高代码的可维护性，方便做自动化测试