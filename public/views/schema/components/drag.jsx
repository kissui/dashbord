'use strict';
import React from 'react';
import Draggable from 'react-draggable';
function getDis(obj1, obj2) {

    var a = obj1.position().left - obj2.position().left;
    var b = obj1.position().top - obj2.position().top;
// console.log(a,b,obj1.position().left,obj2.position().left)
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}
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
        let box = $('.drag-box');
        let currentEle = box.eq(i);
        let duration =Math.sqrt(Math.pow(currentEle.width(), 2) + Math.pow(currentEle.height(), 2));
        let disArr = [];
        for (let d = 0; d < box.length; d++) {
            box.eq(d).css({border: 'none'});
            disArr.push({
                value: i === d ? duration : getDis(currentEle, box.eq(d)),
                index: d
            });
        }
        disArr = _.sortBy(disArr, (o=> {
            return o.value
        }));
        // .css({border: '1px solid red'});
        console.log(disArr, disArr[1]['index'], box.eq(disArr[0]['index']).css({border: '1px solid red'}));
        this.setState({
                deltaPosition: {
                    x: x + ui.deltaX,
                    y: y + ui.deltaY,
                }
            }
        );

    },

    onStart: function (i) {
        let body = $('.drag-body');
        let dragBox = $('.drag-box');
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
                    width: _this.width(),
                }
            );
        });
        console.log(body.width(), body.height(), currentEle.position().left, currentEle.position().top, listPosition);
        this.setState({
            activeDrags: ++this.state.activeDrags,
            index: i,
            listPosition: listPosition,
        })
        ;
    },
    onStop: function (i, e, ui) {
        let currentEle = $('.drag-box').eq(i);
        currentEle.css({opacity: 1, zIndex: 1});
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
        return (
            <div className="drag-body shim" style={{height: '100%', width: '100%'}} id="drag-body">
                {content}
            </div>
        )
    }
});

function penZhu(obj1, obj2) {
    var l1 = obj1.offsetLeft;
    var r2 = obj2.offsetLeft + obj2.offsetWidth;

    var r1 = obj1.offsetLeft + obj1.offsetWidth;
    var l2 = obj2.offsetLeft;

    var t1 = obj1.offsetTop;
    var b2 = obj2.offsetTop + obj2.offsetHeight;

    var t2 = obj2.offsetTop;
    var b1 = obj1.offsetTop + obj1.offsetHeight;

    if (r1 < l2 || l1 > r2 || t1 > b2 || b1 < t2) {
        return false; //没有碰到
    } else {
        return true; //碰到了
    }
}