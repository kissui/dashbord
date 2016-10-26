'use strict';
import React from 'react';
import Draggable from 'react-draggable';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.onChangeConf) {
            let cubeConf = nextProps.onChangeConf;
            let data_fields = [];
            cubeConf.map((item, i)=> {
                // dimension_fields = _.concat(dimension_fields, item.fields.dimension_fields);
                data_fields = _.concat(data_fields, item.fields.data_fields);
            });
            if (data_fields && data_fields.length > 0) {
                _.remove(data_fields, (item)=> {
                    return item.selected === false
                });
            }

            this.setState({
                'data_fields': data_fields
            })
        }

    },
    handleDrag: function (i, e, ui) {
        const {x, y} = this.state.deltaPosition;
        let data = this.state.data_fields;
        let client = this.state.client;
        let currentEle = $('.drag-box').eq(i);
        console.log(currentEle, currentEle.left, '@currentEle', ui);
        this.setState({
                deltaPosition: {
                    x: x + ui.deltaX,
                    y: y + ui.deltaY,

                }
            }
        );
        let position = this.state.deltaPosition;
        // this.move(data, client, i, position);
    },

    onStart: function (i) {
        let body = $('.drag-body');
        let dragBox = $('.drag-box')
        let currentEle = dragBox.eq(i);
        let listPosition = [];
        currentEle.css({opacity: 0.6, zIndex: 10000});
        body.height(body.height());
        dragBox.map((index)=> {
            let _this = dragBox.eq(index);
            listPosition.push(
                {
                    top: _this.position().top,
                    left: _this.position().left,
                    width: _this.width()
                }
            );
        });
        listPosition.map((item, i)=> {
            dragBox.eq(i).css({position: 'absolute', left: item.left, top: item.top})
        });
        console.log(body.width(), body.height(), currentEle.position().left, currentEle.position().top, listPosition);
        this.setState({
            activeDrags: ++this.state.activeDrags,
            index: i,
            moveBox: {
                top: currentEle.position().top,
                left: currentEle.position().left,
            }
        })
        ;
    },

    onStop: function (i, e, ui) {
        let currentEle = $('.drag-box').eq(i);
        // const {top, left} = this.state.moveBox;
        let top = currentEle.position().top;
        let left = currentEle.position().left;
        currentEle.css({opacity: 1, zIndex: 1, top: top, left: left});
        this.setState({
            activeDrags: --this.state.activeDrags,
            deltaPosition: {
                x: 0,
                y: 0
            }
        });

    },
    render: function () {
        let data = this.state.data_fields;
        let content = null;
        const {x, y} = this.state.deltaPosition;
        if (this.state.data_fields && this.state.data_fields.length > 0) {
            if (!this.state.listPosition) {
                content = this.state.data_fields.map((item, i)=> {
                    return (
                        <Draggable bounds="parent" onDrag={this.handleDrag.bind(this, i)}
                                   onStart={this.onStart.bind(this, i)}
                                   onStop={this.onStop.bind(this, i)}
                                   key={i}>
                            <div className={this.state.dragCurrentIndex === i ? 'drag-box high' : "drag-box"}>
                                <div>{item.title}</div>
                            </div>
                        </Draggable>
                    )
                });
            }

        }
        return (
            <div className="drag-body shim" style={{height: '100%', width: '100%'}} id="drag-body">
                {content}
            </div>
        )
    }
});