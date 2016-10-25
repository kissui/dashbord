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
    handleDrag: function (e, i, ui) {
        // console.log(e,ui)
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    },

    onStart: function (e, ui) {
        this.setState({activeDrags: ++this.state.activeDrags});
    },

    onStop: function (e, ui) {
        console.log(document.getElementById('drag-body').style.width)
        this.setState({activeDrags: --this.state.activeDrags});
    },
    move: function (ele) {

    },
    render: function () {
        let data = this.state.data_fields;
        let content = null;
        if (this.state.data_fields && this.state.data_fields.length > 0) {
            const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
            const {deltaPosition, controlledPosition} = this.state;
            content = data.map((item, i)=> {
                return (
                    <Draggable bounds="parent" onDrag={this.handleDrag.bind(this, i)}
                               {...dragHandlers}
                               key={i}>
                        <div className="drag-box shim">
                            <div>{item.title}</div>
                            <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
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