// React-Redux 学习 ---React-Redux 是一个第三方模块.可以帮助我们在React框架中更加方便的使用Redux
import React , {Component} from 'react'
import { connect } from 'react-redux'
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'

// TodoList03是一个UI组件
const TodoList03 = (props) => {
    const { inputValue, list, inputValueChange, btnClick, deleteItem } = props
    return (
        <div>
                <div>
                    <input value={inputValue} onChange={inputValueChange}></input>
                    <button onClick={btnClick}>提交</button>
                </div>
                <ul>
                    {
                        list.map((item, index) => 
                            <li key={index} 
                                onClick={()=>{deleteItem(index)}}>
                                    {item}
                            </li>)
                    }
                </ul>
            </div>
    )
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
      inputValue: state.inputValue,
      list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        inputValueChange(e) {
            const action = getInputChangeAction(e.target.value)
            dispatch(action)
        },
        btnClick() {
            const action = getAddItemAction()
            dispatch(action)
        },
        deleteItem(index) {
            console.log(index)
            const action = getDeleteItemAction(index)
            dispatch(action)
        }
    }
}

// 【connect特性：store中的数据发生改变，组件中的数据会自动更新】
// 之前还需要subscribe订阅，现在使用了 react-redux，不再需要订阅
export default connect(mapStateToProps, mapDispatchToProps)(TodoList03)
// connect的作用：将一个UI组件与数据绑定，并返回一个容器组件
// 导出的是一个容器组件。

