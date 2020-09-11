import React, { Fragment } from 'react'

class TodoList extends React.Component {
    // 优先执行
    constructor(props) {
        super(props)
        // 组件的状态
        this.state = {
            inputValue: 'hello', 
            list: []
        }
    }

    render() {
        return (
            // 1. render函数，只能返回【一个DOM根元素】
            // 2. 如果使用div包裹，在查看DOM元素时，会发现多出来一个div。如果不想冗余，可以使用React中的 【Fragment占位符】
            // 有点类似于 Vue 中的 <template>
            <Fragment>
                <div>
                    {/* 在React中绑定事件，必须使用【小驼峰】规则 */}
                    <input 
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        />
                    <button>提交</button>
                </div>
                <ul>
                    <li>学英语</li>
                    <li>学英语2</li>
                </ul>
            </Fragment>
        )
    }

    handleInputChange(e) {
        console.log(e.target)
    }
}

export default TodoList