import React, {Component} from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {
    constructor(props) {
        super(props)
        // 【推荐】【在 construnctor() 中调用 bind(this)】
        // 因为构造函数会被优先调用。这样 hanleClick() 中的this，就永远指向了TodoItem组件了。
        // 【更喜欢】使用箭头函数 定义函数。因为箭头函数中的this，默认指向外部的this
        // this.handleClick = this.handleClick.bind(this)
    }

    // 【当一个组件，从父组件接收了参数。
    //  如果这个组件第一次存在于父组件中，不会被执行
    //  如果组件之前已经存在于父组件中，才会执行】
    componentWillReceiveProps() {
        console.log('child componentWillReceiveProps')
    }

    // 当组件即将被页面移除时，会被自动执行
    componentWillUnmount() {
        console.log('child componentWillUnmount')
    }

    // 【使用场景】提升组件的性能：避免组件做无谓的render操作
    // 因为，当父组件的content发生变化时，父组件的render被执行，则子组件的render也会被重新执行
    // 所以，我们可以使用 shouldComponentUpdate 做性能优化
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.content !== this.props.content) {
            return true
        } else {
            return false
        }
    }

    render() {
        console.log('child render')
        // 优化：使用解构赋值
        const { content, test } = this.props
        // 【JSX -> createElement -> 虚拟DOM(JS 对象) -> 真实的DOM】
        // return React.createElement('div', {}, 'item')
        return (
            // 不推荐直接在事件上调用 bind(this) 【存在性能上的损耗】
            <div onClick={this.handleClick}>
                {/* {this.props.content} */}
                {test} - {content}
            </div>
        )
    }

    handleClick = () => {
        // alert(this.props.index)
        // this.props.deleteItem(this.props.index)

        // 优化：使用解构赋值
        const { deleteItem, index } = this.props
        deleteItem(index)
    }

    // handleClick() {
    //     // 改父组件中的list 的数据【不允许子直接修改父】
    //     // 调用父组件中 handleItemDelete 方法即可
    //     // alert(this.props.index)

    //     // 子组件如何调用父组件中的方法，去改变父组件中的数据？
    //     // 【把父组件中的方法，通过绑定属性的方式，传递给子组件】即可。
    //     this.props.deleteItem(this.props.index)
    //     // 相当于在调用 this.handleItemDelete、很显然，在子组件中并没有 this.handleItemDelete 方法
    //     // 所以还需要将 this 指向父组件【即，在父组件向子组件传递方法时，需要将 this，强制绑定到父组件TodoList】
    // }
}

// 对 TodoItem 组件的属性做校验  【在开发时，建议都做属性校验】
// 语法：【组件名.propTypes】 [注意：属性名首字母是小写]
TodoItem.propTypes = {
    test: PropTypes.string.isRequired, // 字符串且必传
    content: PropTypes.string,
    deleteItem: PropTypes.func,
    index: PropTypes.number
} 

// 设置props的默认值
TodoItem.defaultProps = {
    test: 'hello world'
}

export default TodoItem
