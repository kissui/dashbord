'use strict';
import React from 'react';
import Draggable from 'react-draggable';
function getDis(obj1, obj2) {
    var a = obj1.position().left - obj2.position().left;
    var b = obj1.position().top - obj2.position().top;
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}
module.exports = React.createClass({
    getInitialState: function () {
        return {
            activeDrags: 0,
            changeIndex: null,
            deltaPosition: {
                x: 0, y: 0
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        let defaultDataFields;

        if (this.props.onDefaultConf.conf && this.props.onDefaultConf.name == 'editFile') {
            defaultDataFields = JSON.parse(sessionStorage.getItem('SCHEMA_FILE_DETAIL')).table_conf.fields.data_fields;
        }
        if (nextProps.onChangeConf) {
            let isFirst = !this.props.onIsFirst || this.state.dragStart;
            this.setState({
                'data_fields': !isFirst ? defaultDataFields : nextProps.onChangeConf
            })
        }

    },
    handleDrag: function (i, e, ui) {
        const {x, y} = this.state.deltaPosition;
        let box = $('.drag-box');
        let currentEle = box.eq(i);
        console.log('@dragRange:',x,y);
        currentEle.css({transform: "translate(" + x + 'px,' + y + "px)"});
        let duration = Math.sqrt(Math.pow(currentEle.width(), 2) + Math.pow(currentEle.height(), 2));
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
        box.eq(disArr[0]['index']).css({
            border: '1px solid red'
        });
        this.setState({
                deltaPosition: {
                    x: x + ui.deltaX,
                    y: y + ui.deltaY
                },
                changeIndex: disArr[0]['index']
            }
        );

    },

    onStart: function (i) {
        let body = $('.drag-body');
        let dragBox = $('.drag-box');
        let currentEle = dragBox.eq(i);
        let listPosition = [];
        currentEle.css({opacity: 0.6, zIndex: 10000});
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
        this.setState({
            activeDrags: ++this.state.activeDrags,
            index: i,
            listPosition: listPosition,
            dragStart: true
        })
    },
    onStop: function (i, e, ui) {
        let box = $('.drag-box');
        let dataFields = this.state.data_fields;
        const {changeIndex} = this.state;

        function pushBy(collection, inject, index) {
            let collect = collection;
            let byBefore = collect.splice(0, index);
            return byBefore.concat(inject).concat(collect);
        }

        if (changeIndex != null && i != changeIndex) {
            // console.log(11111)
            // let forkData = dataFields[i];
            // let selectData = dataFields[changeIndex != 'undefined' ? changeIndex : i];
            //
            // dataFields.map((item, c)=> {
            //     if (c === i) {
            //         dataFields[c] = selectData
            //     }
            //     if (c === this.state.changeIndex) {
            //         dataFields[c] = forkData;
            //     }
            // });

            let injectField = _.remove(dataFields, (item, ind)=> {
                return ind === i;
            });
            dataFields = pushBy(dataFields, injectField, changeIndex);
            console.log('@interRange:', changeIndex, i, dataFields);
        }
        this.setState({
            activeDrags: --this.state.activeDrags,
            data_fields: dataFields,
            deltaPosition: {
                x: 0,
                y: 0
            }
        });
        for (let b = 0; b < box.length; b++) {
            box.eq(b).removeClass('react-draggable-dragged').css(
                {
                    opacity: 1,
                    zIndex: 1,
                    transform: 'translate(0px,0px)',
                    border: 'none'
                }
            );
        }
        this.props.onHandleDrag(dataFields);

    },
    render: function () {
        let data = this.state.data_fields;
        let content = null;
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