import React from 'react';  // JSX 语法：如果在React项目中，使用了JSX语法，那么在对应的文件中，必须要引入 React
import ReactDOM from 'react-dom';

// import TodoList from './TodoList';
import App from './App'  // 组件
//在react中，如果要使用自己创建的组件，则组件名必须以大写字母开头，比如App，不能使用 app

// ReactDOM 的 render() ：把一个组件挂载到某个结点并渲染。
ReactDOM.render(
    // <TodoList />,
    <App/>,
    {/* JSX语法 
    并没有直接 App 来使用组件，而是使用了 <App/>标签的方式来使用组件。这就是JSX语法。
    如果不引入React，（import React from 'react'）则无法编译这种React语法。
    */}
  document.getElementById('root')
);


// 【最基础的JSX语法】：
// 在 .js 文件中写 HTML 标签 === JSX语法
// 【注意：】在 JSX 语法中，如果要使用自己定义的组件，那么组件名必须以大写字母开头。比如 <App/> 不能使用 <app/>

//#region 【JSX细节补充】
//  1. 如何在 JSX 中写注释？
//  { /* 多行注释内容 */ }
//  {
        // 单行注释
//  }
// 2. 【增加样式】[className定义类名]
// React 中, class 是类，不能用做样式上使用class，有冲突，---> 用 className 代替样式中的class
// 3. 【label】---》[for]--->[htmlFor]
//#endregion

//#region 【拆分组件与组件之间的传值】
// 【父传子】:父组件通过绑定属性的方式传递给子组件，子组件通过 this.props.xxx进行接收
// 【子传父】：父组件通过绑定属性的方式，将父组件中的方法，传递给子组件。子组件中通过this.props.yyy进行接收。
//             [注意，在父组件中绑定属性传递函数时，要使用 bind(this) 将传递的函数内部this指向父组件。]
//#endregion

//#region 【围绕React衍生出的思考】
// [声明式开发]
// 【可以与其他框架并存】
// 【组件化】
// 【单向数据流】
// 【视图层框架】 A JavaScript library for building user interfaces
// 【函数式编程】
//#endregion

//#region 【PropTypes 与 DefaultProps】
// 问题：子组件在接收父组件传递过来的数据this.props时，如何对接收的参数做校验? 如何定义参数的默认值？
// import PropTypes from 'prop-types'
// 语法：【组件名.propTypes】 [注意：属性名首字母是小写]
// TodoItem.propTypes = {
//     test: PropTypes.string.isRequired, // 字符串且必传
//     content: PropTypes.string,
//     deleteItem: PropTypes.func,
//     index: PropTypes.number
// } 
// 设置props的默认值
// 语法：【组件名.defaultProps】 [注意：属性名首字母是小写]
// TodoItem.defaultProps = {
//     test: 'hello world'
// }
//#endregion

//#region 【props， state, render 函数之间的关系】
// 【当组件的 state 或 props 发生改变的时候，render()函数就会重新执行一次】
// 【当父组件的render函数被运行时，它的子组件的render都将被重新运行一次】
//#endregion

//#region 【什么是虚拟DOM？】
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
//#endregion

//#region 【深入了解虚拟DOM】
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
//#endregion

//#region 【虚拟DOM的Diff算法】
// 什么时候数据会发生变化？
// 调用 setState() 方法时 ---> 异步
// 如果你连续调用3次setState()， React 会把 3次 setState() 合并成 1 个 setState()，只做 1次虚拟DOM的比对，然后更新 1次DOM

// 【同级比较】
// 算法简单，比对速度，较快。
//#endregion

// 【ref的使用】：获取DOM元素
// 注意，在setState和 ref 一起使用时，【一定要把ref放在setState的回调函数中去获取】
// 【因为,setState是异步】

//#region 【生命周期函数】
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
//#endregion

//#region 【生命周期函数的使用场景】
// shouldComponentUpdate 提升 React 组件的性能

// componentDidMount() --- 获取ajax 数据---不要写在render()中【因为render会反复执行】
// componentWillMount() --- 放ajax 也可以，但是做高级功能时，会冲突
// constructor() ---放 ajax 也可以

// 【约定：ajax请求永远放在 componentDidMount生命周期函数中，不会有任何问题】

// 在React 中如何发送 ajax 请求？
// 使用 axios :    npm i axios

// React中提升组件性能有哪些方式？ [面试点]
//#endregion

//#region 【使用Charles实现本地数据mock】
//#endregion

//#region React 的CSS过渡动画
// 3种方式：
// 1. transiton
// 2. @keyframes animationName {}
// 3. react-transition-group 第三方模块实现动画 【推荐】
// https://reactcommunity.org/react-transition-group/
// 多个动画元素的实现
//#endregion
