'use strict';
import React from 'react';
import Draggable from 'react-draggable';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            },
            controlledPosition: {
                x: -400, y: 200
            }
        };
    },

    handleDrag: function (e, ui) {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    },

    onStart: function() {
        console.log('@start',++this.state.activeDrags)
        this.setState({activeDrags: ++this.state.activeDrags});
    },

    onStop: function() {
        console.log('@stop',++this.state.activeDrags)
        this.setState({activeDrags: --this.state.activeDrags});
    },
    render: function () {
        console.log(this.props.onTable)
        let data = this.props.onTable.conf.table_conf.fields.data_fields;
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition, controlledPosition} = this.state;
        return (
            <div>
                {data.map((item,i)=>{
                    return (
                        <Draggable onDrag={this.handleDrag} {...dragHandlers}>
                            <div className="box">
                                <div>{item.title}</div>
                                <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
                            </div>
                        </Draggable>
                    )
                })}

                <Draggable handle="strong" {...dragHandlers}>
                    <div className="box no-cursor">
                        <strong className="cursor"><div>哈哈</div></strong>
                        <div>什么鬼什么鬼</div>
                    </div>
                </Draggable>
                <Draggable cancel="strong" {...dragHandlers}>
                    <div className="box">
                        <strong className="no-cursor">不能拖着</strong>
                        <div>什么鬼什么鬼什么鬼</div>
                    </div>
                </Draggable>

            </div>

        )
    }
});