'use strict';
/**
 * Count 构造函数类
 * props => Distance 时间间距
 * state => isOver 是否结束
 */
import React from 'react';
const COUNT_STYLE = {
    background: 'red',
    color: '#fff',
    textAlign: 'center',
    padding: '8px 16px'
};
class Count extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: props.Distance,
            infoTime : props.Distance,
            isOver: false
        };
        this.getAgain = this.getAgain.bind(this);
    }

    componentDidMount() {
        this.countDown();
    }

    countDown() {
        console.log(this.state);
        let me = this,
            defaultTime = this.state.time;

        this.setState({
            time: defaultTime-1
        });
        let timer = setTimeout(function () {
            me.countDown()
        }, 1000);
        if (this.state.time === 0) {
            clearTimeout(timer);
            this.setState({
                isOver: true,
                time: this.state.infoTime + 1
            })
        }
    }

    getAgain() {
        if (this.state.isOver) {
            this.setState({
                isOver: false
            });
            this.countDown();
        }
    }

    render() {
        let content = this.state.isOver ? '重新获取' : this.state.time;

        return (
            <div className="count" style={COUNT_STYLE} onClick={this.getAgain}>
                {content}
            </div>
        )
    }

}
Count.propTypes = {
    Distance: React.PropTypes.number
};
module.exports = Count;