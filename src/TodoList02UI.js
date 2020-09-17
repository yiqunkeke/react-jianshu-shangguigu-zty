import React from 'react'
import { Input, Button, List } from 'antd';

// 【有状态组件，包含生命周期函数，还要执行render】
// 【耗费性能】
// class TodoList02UI extends React.Component {
//     render() {
//         return (
//             <div style={{marginTop: '10px', marginLeft: '10px'}}>
//                 <div>
//                     <Input placeholder="todo info" 
//                         value={this.props.inputValue} 
//                         style={{width: '300px', marginRight: '10px'}}
//                         onChange={this.props.handleInputChange}/>
//                     <Button type="primary" onClick={this.props.handleBtnClick}>提交</Button>
//                 </div>
//                 <List
//                     style={{marginTop: '10px', width: '300px'}}
//                     bordered
//                     dataSource={this.props.list}
//                     renderItem={(item, index) => (
//                         <List.Item onClick={(index) => this.props.handleItemDelete(index)}>
//                             {item}
//                         </List.Item>
//                     )}
//                     />
//             </div>
//         )
//     }
// }

// 【无状态组件】：只有一个render()
// 【优势：性能比较高，因为它就是一个函数】
const TodoList02UI = (props) => {
    return (
        <div style={{marginTop: '10px', marginLeft: '10px'}}>
            <div>
                <Input placeholder="todo info" 
                    value={props.inputValue} 
                    style={{width: '300px', marginRight: '10px'}}
                    onChange={props.handleInputChange}/>
                <Button type="primary" onClick={props.handleBtnClick}>提交</Button>
            </div>
            <List
                style={{marginTop: '10px', width: '300px'}}
                bordered
                dataSource={props.list}
                renderItem={(item, index) => (
                    <List.Item onClick={() => props.handleItemDelete(index)}>
                        {item}
                    </List.Item>
                )}
                />
        </div>
    )
}

export default TodoList02UI

// 【建议：如果一个组件只有一个render函数，建议用无状态组件，这样性能更高】
// 【UI组件通常用无状态组件，但也不是绝对。UI组件也可以进行简单的逻辑。】