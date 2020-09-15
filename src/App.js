// 实现：点击按钮，div动画切换
import React, {Component, Fragment} from 'react'
import { CSSTransition } from 'react-transition-group'; // CSSTranstion--动画组件
import './style.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }
    render() {
        return (
            // 1. 使用CSS过渡动画 或 动画
            // <Fragment>
            //     <div className={this.state.show ? 'show' : 'hide'}>hello</div>
            //     <button onClick={this.toggle}>toggle</button>
            // </Fragment>

            // 2. 使用 CSSTransition 第三方模块实现动画
            // 需求：当入场动画完成之后，让 hello 变成蓝色。方案：【使用CSS、使用JS】【onEnter钩子】
            // 页面初次加载时，也希望有动画效果：【appear={true}】，同时添加 .fade-appear  和 .fade-appear-active 类
            <Fragment>
                <CSSTransition
                    in={this.state.show}
                    timeout={1000}
                    classNames="fade"
                    unmountOnExit
                    onEnter={(el) => { el.style.color = 'blue'}}
                    appear={true}>
                    <div>hello</div>
                </CSSTransition>
                <button onClick={this.toggle}>toggle</button>
            </Fragment>
        )
    }

    toggle = () => {
        this.setState({
            show: this.state.show ? false : true
        })
    }
}

export default App