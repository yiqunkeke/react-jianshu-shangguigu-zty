import React from 'react'; 
import ReactDOM from 'react-dom';

import TodoList02 from './TodoList02';

ReactDOM.render(
    <TodoList02 />,
  document.getElementById('root')
);

// Redux 入门 -----------------------------------------------------

//#region 【Redux 概念简述】
// 设计理念 ： 组件----> store ---->其他组件
// Redux = Reducer + Flux
// Flux 框架：官方推出的最原始的数据辅助型框架（为了辅助React框架）   缺点：多个store
// Flux升级 --> Redux （融合了Reducer）
//#endregion

//#region 【Redux的工作流程】
// Redux就是一个数据型框架：
//  Store     React Components       Action Creators       Reducers
// [管理员]      [借书的人]          [要借什么书] 这句话     [记录本]
// 管理员需要通过查询记录本，才能找到你要找的书。
// 所以，创建Store同时，需要创建并引入reducer。才算完整的创建好了仓库。
//#endregion
