import React from 'react'; 
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import TodoList03 from './TodoList03';
import store from './store'


ReactDOM.render(
  <Provider store={store}>
    <TodoList03 />
  </Provider>,
  document.getElementById('root')
);

//#region 【如何使用 React-redux】
// 1. Provider 提供器
// Provider组件是 react-redux 的一个核心组件。它可以把store提供给内部组件。
// <Provider store={store}>
//  <TodoList03 />
// </Provider>
// 用Provider组件包含内部组件TodoList03，则Provider内部的组件，就都可以直接使用store了。
// 所以,Provider叫提供器。

// 2. 用connect() 连接组件和store
// 在TodoList组件内，需要使用 connnet 方法做连接
// import { connect } from 'react-redux'
// ...
// export default connect(mapStateToProps, mapDispatchToProps)(TodoList03)

//#endregion
