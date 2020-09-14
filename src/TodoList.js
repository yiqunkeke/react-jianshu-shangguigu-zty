import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem' // 引入组件
// import Test from './Test'
import './style.css'

class TodoList extends Component {
    // 当组件被创建时，会被调用----
    // 优先执行
    constructor(props) {
        super(props)
        // 【this.state 是组件的状态：负责存储组件中的数据】
        // 【当组件的 state 或 props 发生改变的时候，render()函数就会重新执行一次】
        this.state = {
            inputValue: '', 
            list: []
        }
        // 【推荐】在constructor中进行bind(this)绑定
        // 【更喜欢】使用箭头函数 定义函数。因为箭头函数中的this，默认指向外部的this
        // this.handleInputChange = this.handleInputChange.bind(this)
        // this.handleBtnClick = this.handleBtnClick.bind(this)
        // this.handleItemDelete = this.handleItemDelete.bind(this)
    }

    // 在组件即将被挂载到页面的时刻自动执行
    componentWillMount() {
        console.log('componentWillMount')
    }

    // 组件被挂载到页面之后 ，自动执行
    componentDidMount() {
        console.log('componentDidMount')
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

    
    // render 函数--生命周期函数
    // 【render不能少，每个组件必须要写】
    // 其他的生命周期函数可以不写，因为 React.Component中内置了这些生命周期函数，唯独没有内置render()生命周期函数。
    render() {
        console.log('parent render')
        return (
            // 1. render函数，只能返回【一个DOM根元素】
            // 2. 如果使用div包裹，在查看DOM元素时，会发现多出来一个div。如果不想冗余，可以使用React中的 【Fragment占位符】
            // 有点类似于 Vue 中的 <template>。
            // Fragment 是 React 中的一个组件。
            <Fragment>
                <div>
                    {/* 【在React中，for 被用于循环。如果要在label上用for,需要换成 htmlFor】 */}
                    <label htmlFor="insertArea">输入内容：</label>
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
        // console.log(e.target.value)
        // console.log(this) // undefined ---> 可以通过 bind() 修改函数中的 this 指向
        // this.state.inputValue = e.target.value

        // 【在变更state状态时，需要使用 this.setState() 方法进行变更】
        // this.setState({
        //     inputValue: e.target.value
        // })

        // 优化: this.setState()中也可以传递一个函数作为参数
        // const value = e.target.value // 【注意：setState()使用函数参数时】需将值做一份保存来使用
        const value = this.input.value
        this.setState(() => ({
            inputValue: value
        }))
        
    }

    // handleBtnClick() {
    handleBtnClick = () => {
        // this.setState({
        //     // 展开当前state.list，放到一个数组中。并拼接 inputValue
        //     list: [...this.state.list, this.state.inputValue],
        //     inputValue: ''
        // })

        // 优化：prevState 是原来的state 的值
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }))
    }

    // handleItemDelete(index) {
    handleItemDelete = (index) => {
        // console.log(index)

        // 【推荐】
        // let list = [...this.state.list] // 拷贝一份 state.list，并赋给常量 list
        // list.splice(index, 1)
        // this.setState({
        //     list: list
        // })

        // 优化：
        this.setState((prevState) => {
            const list = [...prevState.list]
            list.splice(index, 1)
            return {
                list
            }
        })

        // 不推荐【在React中，immutable:state 不允许我们做任何改变】
        // this.state.list.splice(index, 1)
        // this.setState({
        //     list: this.state.list
        // })
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

// 【JSX细节补充】
//  1. 如何在 JSX 中写注释？
//  { /* 多行注释内容 */ }
//  {
        // 单行注释
//  }
// 2. 【增加样式】[className定义类名]
// React 中, class 是类，不能用做样式上使用class，有冲突，---> 用 className 代替样式中的class
// 3. 【label】---》[for]--->[htmlFor]


// 【拆分组件与组件之间的传值】[重点]
// 【父传子】
// 【子传父】


// 围绕React衍生出的思考：
// [声明式开发]
// 【可以与其他框架并存】
// 【组件化】
// 【单向数据流】
// 【视图层框架】
// 【函数式编程】


// PropTypes 与 DefaultProps
// 问题：子组件在接收父组件传递过来的数据this.props时，如何对接收的参数做校验? 如何定义参数的默认值？


// props， state, render 函数之间的关系
// 【当组件的 state 或 props 发生改变的时候，render()函数就会重新执行一次】
// 【当父组件的render函数被运行时，它的子组件的render都将被重新运行一次】


// 什么是虚拟DOM？[原理]
// 【变革性】
// 1.state数据
// 2.JSX模板
// 3.数据+模板 结合，生成真实的DOM，来显示
// 4.state发生改变
// 5.数据+模板 结合，生成真实的DOM，替换原始的DOM【耗费大量性能】

// 缺陷：
// 第一次生成了一个完整的DOM片段
// 第二次生成了一个完整的DOM片段
// 第二次的DOM替换第一次的DOM，非常耗性能

// 1.state数据
// 2.JSX模板
// 3.数据+模板 结合，生成真实的DOM，来显示
// 4.state发生改变
// 5.数据+模板 结合，生成真实的DOM，并不直接替换原始的DOM
// 6.把新的DOM和原始的DOM 做比对，找差异【DOM替换性能提升】【消耗比对性能】
// 7.找出input框发生了变化 【DOM与DOM层的对比，非常耗费性能】
// 8.只用新的DOM中的input元素，替换掉老的DOM中的input元素

// 缺陷： 性能的提升并不明显

// 1.state数据
// 2.JSX模板
// 3.数据+模板 结合，生成真实的DOM，来显示
// <div id="abc"><span>hello world</span></div>
// 4.生成虚拟DOM，(虚拟DOM就是一个JS对象，用它来描述真实DOM) 【损耗了性能】
// ['div', {id: 'abc'}, ['span', {}, 'hello world']]
// 5.state发生改变
// 6.数据+模板，生成新的虚拟DOM【极大的提升了性能】
// ['div', {id: 'abc'}, ['span', {}, 'bye bye']]
// 7.比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是span中的内容【比对的是虚拟DOM，即两个JS对象的比对。而非DOM之间的比对】
// 8. 直接操作DOM，改变span中的内容

// 原理：【减少了对真实DOM的创建和对比，取而代之，创建和对比的都是JS对象】
// 在JS中，对比两个JS对象并不耗费多少性能。但是对比DOM，是非常耗费性能的。


// 深入了解虚拟DOM：
// 
// 1.state数据
// 2.JSX模板 【JSX -> createElement -> 虚拟DOM(JS 对象) -> 真实的DOM】
// 3.生成虚拟DOM，(虚拟DOM就是一个JS对象，用它来描述真实DOM) 【损耗了性能】
// ['div', {id: 'abc'}, ['span', {}, 'hello world']]

// 4.用虚拟DOM的结构生成真实的DOM，来显示
// <div id="abc"><span>hello world</span></div>

// 5.state发生改变

// 6.数据+模板，生成新的虚拟DOM【极大的提升了性能】
// ['div', {id: 'abc'}, ['span', {}, 'bye bye']]

// 7.比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是span中的内容【比对的是虚拟DOM，即两个JS对象的比对。而非DOM之间的比对】

// 8. 直接操作DOM，改变span中的内容

// 虚拟DOM 带来的好处？
// 1.性能提升了【从DOM比对-->JS对象比对】
// 2.使得跨端应用得以实现。React Native。
//   【可以把虚拟DOM转为原生组件】


// 虚拟DOM的Diff算法
// 什么时候数据会发生变化？
// 调用 setState() 方法时 ---> 异步
// 如果你连续调用3次setState()， React 会把 3次 setState() 合并成 1 个 setState()，只做 1次虚拟DOM的比对，然后更新 1次DOM

// 【同级比较】
// 算法简单，比对速度，较快。


// 【ref的使用】：获取DOM元素
// 注意，在setState和 ref 一起使用时，【一定要把ref放在setState的回调函数中去获取】
// 【因为,setState是异步】


// 【生命周期函数】：
// 指在某一个时刻会自动调用执行的函数
// render() ---> 生命周期函数 【当组件的 state 或 props 发生改变的时候，render()函数就会重新执行一次】
// 1. Initialization

// 2. Mounting :  
//      componentWillMount() ---在组件即将被挂载到页面的时刻自动执行。
//      render()---挂载
//      componentDidMount() ---挂载之后

// 3. updation ：
// componentWillReceiveProps() -- 子组件接收props 
// shouldComponentUpdate() --- return true/false
// componentWillUpdate()
// render()
// componentDidUpdate()

// 4. unmounting ：
// componentWillUnmount()


// 【生命周期函数的使用场景】
// shouldComponentUpdate 提升 React 组件的性能

// React中提升组件性能有哪些方式？ [面试点]

