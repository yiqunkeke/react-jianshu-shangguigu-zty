import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem' // 引入组件
// import Test from './Test'
import axios from 'axios'
import './style.css'

class TodoList extends Component {
    // 当组件被创建时，会被调用----
    // 优先执行
    constructor(props) {
        super(props)
        //#region 
        // 【this.state 是组件的状态：负责存储组件中的数据】
        // 【当组件的 state 或 props 发生改变的时候，render()函数就会重新执行一次】
        //#endregion
        this.state = {
            inputValue: '', 
            list: []
        }
        //#region 
        // 【推荐】在constructor中进行bind(this)绑定
        // 【更喜欢】使用箭头函数 定义函数。因为箭头函数中的this，默认指向外部的this
        // this.handleInputChange = this.handleInputChange.bind(this)
        // this.handleBtnClick = this.handleBtnClick.bind(this)
        // this.handleItemDelete = this.handleItemDelete.bind(this)
        //#endregion
    }

    // 在组件即将被挂载到页面的时刻自动执行
    componentWillMount() {
        console.log('componentWillMount')
    }

    // 组件被挂载到页面之后 ，自动执行
    componentDidMount() {
        console.log('componentDidMount')
        // 【发送ajax请求】
        axios.get('/api/todolist')
        .then((res) => {
            alert('succ')

            // this.setState(() => {
            //     return {
            //         list: res.data
            //     }
            // })

            // 优化：
            // 【最佳实践：不要直接操作res.data】
            // 【尽量把 res.data 使用...打散，然后赋值给新数组，避免误操作原始数据】
            this.setState(() => ({
                list: [...res.data]
            }))
        })
        .catch(()=>{
            alert('error')
        })
        
    }

    // 组件被更新之前，它会自动被执行
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')
        // return false
        return true
    }

    // 组件被更新之前，且shouldComponentUpdate返回true之后，会被自动执行
    // 如果 shouldComponentUpdate 返回false，则不会执行
    componentWillUpdate() {
        console.log('componentWillUpdate')
    }

    // 组件更新完成之后，会被执行
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }

    //#region 
    // render 函数--生命周期函数
    // 【render不能少，每个组件必须要写】
    // 其他的生命周期函数可以不写，因为 React.Component中内置了这些生命周期函数，唯独没有内置render()生命周期函数。
    //#endregion
    render() {
        console.log('parent render')
        return (
            //#region 
            // 1. render函数，只能返回【一个DOM根元素】
            // 2. 如果使用div包裹，在查看DOM元素时，会发现多出来一个div。如果不想冗余，可以使用React中的 【Fragment占位符】
            // 有点类似于 Vue 中的 <template>。
            // Fragment 是 React 中的一个组件。
            //#endregion
            <Fragment>
                <div>
                    <label htmlFor="insertArea">输入内容：</label>
                    {/* 【在React中，for 被用于循环。如果要在label上用for,需要换成 htmlFor】 */}
                    {/* 在React中绑定事件，事件名必须使用【小驼峰】规则 */}
                    {/* 在React中，如果需要用到js变量或者表达式，需要用 {} 进行包裹 */}
                    {/* 在绑定事件时，可以用 bind(this)对函数中this的作用域进行变更 */}
                    <input 
                        id="insertArea"
                        className="input"
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        ref={(input) => {this.input = input}}
                        />
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>

                <ul>
                    {this.getTodoItem()}
                </ul>

                {/* <Test content={this.state.inputValue}></Test> */}

            </Fragment>
        )
    }

    // handleInputChange (e) {
    handleInputChange = (e) => {
        //#region 
        // console.log(e.target.value)
        // console.log(this) // undefined ---> 可以通过 bind() 修改函数中的 this 指向
        // this.state.inputValue = e.target.value

        // 【在变更state状态时，需要使用 this.setState() 方法进行变更】
        // this.setState({
        //     inputValue: e.target.value
        // })

        // 优化: this.setState()中也可以传递一个函数作为参数
        // const value = e.target.value // 【注意：setState()使用函数参数时】需将值做一份保存来使用
        //#endregion
        const value = this.input.value
        this.setState(() => ({
            inputValue: value
        }))
        
    }

    // handleBtnClick() {
    handleBtnClick = () => {
        //#region 
        // this.setState({
        //     // 展开当前state.list，放到一个数组中。并拼接 inputValue
        //     list: [...this.state.list, this.state.inputValue],
        //     inputValue: ''
        // })

        // 优化：prevState 是原来的state 的值
        //#endregion
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }))
    }

    // handleItemDelete(index) {
    handleItemDelete = (index) => {
        //#region 
        // console.log(index)

        // 【推荐】
        // let list = [...this.state.list] // 拷贝一份 state.list，并赋给常量 list
        // list.splice(index, 1)
        // this.setState({
        //     list: list
        // })

        // 优化：
        //#endregion
        this.setState((prevState) => {
            const list = [...prevState.list]
            list.splice(index, 1)
            return {
                list
            }
        })

        //#region 
        // 不推荐【在React中，immutable--- state 不允许我们做任何改变】
        // this.state.list.splice(index, 1)
        // this.setState({
        //     list: this.state.list
        // })
        //#endregion
    }

    // 优化:
    getTodoItem() {
        return this.state.list.map((item, index) => 
        // 在 bind()中，第二个可以传参数
        // 如果在JSX中不希望内容被转义，比如<h1>hello world</h1>，直接以h1展示
        // 可以通过 dangerouslySetInnerHTML 属性的{__html: xxx}进行设置
        // <li key={index} 
        //     onClick={this.handleItemDelete.bind(this, index)}
        //     dangerouslySetInnerHTML={{__html: item}}>
        //         {/* {item} */}
        // </li>
        
        // 【父传子】
        // 父组件向子组件传值【通过属性方式】，比如content属性
        // 子组件中，通过 this.props.content 接收
        // 【子传父】[在子组件中就可以调用父组件中的方法，修改父组件中的数据]
        // 【把父组件中的方法，通过绑定属性的方式，传递给子组件】即可。
        // 【在父组件向子组件传递方法时，需要将 this，强制绑定到父组件TodoList】
        // <TodoItem key={index} content={item} index={index} deleteItem={this.handleItemDelete.bind(this)}></TodoItem>
        <TodoItem 
            key={index} 
            content={item} 
            index={index} 
            deleteItem={this.handleItemDelete}>
        </TodoItem>
        )
    }
}

export default TodoList
