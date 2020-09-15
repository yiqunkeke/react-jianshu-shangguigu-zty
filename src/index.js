import React from 'react';  // JSX 语法：如果在React项目中，使用了JSX语法，那么在对应的文件中，必须要引入 React
import ReactDOM from 'react-dom';

// import TodoList from './TodoList';
import App from './App'  // React中实现CSS过渡动画

// ReactDOM 的 render() ：把一个组件挂载到某个结点并渲染。
ReactDOM.render(
    // <TodoList />,
    <App/>,
  document.getElementById('root')
);


// 【最基础的JSX语法】：
// 在 .js 文件中写 HTML 标签 === JSX语法
// 【注意：】在 JSX 语法中，如果要使用自己定义的组件，那么组件名必须以大写字母开头。比如 <App/> 不能使用 <app/>
