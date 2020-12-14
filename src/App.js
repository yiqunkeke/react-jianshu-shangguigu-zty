// 实现：点击按钮，div动画切换
import React, {Component, Fragment} from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // CSSTranstion--动画组件
import './style.css'

class App extends Component { // 因为App要定义成一个组件。所以它必须继承react中的Component这个基类。
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            list: []
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
            // https://reactcommunity.org/react-transition-group
            // import { CSSTransition } from 'react-transition-group';
            // 需求：当入场动画完成之后，让 hello 变成蓝色。方案：【使用CSS、使用JS】【onEnter钩子】
            // 页面初次加载时，也希望有动画效果：【appear={true}】，同时添加 .fade-appear  和 .fade-appear-active 类
            // <Fragment>
            //     <CSSTransition
            //         in={this.state.show}
            //         timeout={1000}
            //         classNames="fade"
            //         unmountOnExit
            //         onEnter={(el) => { el.style.color = 'blue'}}
            //         appear={true}>
            //         <div>hello</div>
            //     </CSSTransition>
            //     <button onClick={this.toggle}>toggle</button>
            // </Fragment>

            // 3. 使用CSSTransition 实现多个动画元素的动画
            // 需求：list的中的都实现动画，
            // 需要使用CSSTransition 配合 TransitionGroup使用。
            // import { CSSTransition, TransitionGroup } from 'react-transition-group';
            <Fragment>
                <TransitionGroup>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <CSSTransition
                                    timeout={1000}
                                    classNames="fade"
                                    unmountOnExit
                                    onEnter={(el) => { el.style.color = 'blue'}}
                                    appear={true}
                                    key={index}>
                                <div >{item}</div>
                                </CSSTransition>
                            )
                        })
                    }
                </TransitionGroup>
                <button onClick={this.handleAddItem}>toggle</button>
            </Fragment>
        )
    }

    toggle = () => {
        this.setState({
            show: this.state.show ? false : true
        })
    }

    handleAddItem = () => {
        this.setState((prevState) => {
            return {
                list: [...prevState.list, 'item']
            }
        })
    }


}

export default App
