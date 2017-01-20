'use strict';
import React from 'react';
import http from '../../lib/http';
import moment from 'moment';
import {Radio, Button, Icon, DatePicker} from 'antd';
// TODO: 设置i18n 中文检索
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const {MonthPicker, RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';

// TODO: CLASS Content
export default class ReportContent extends React.Component {
    constructor(context, props) {
        super(context, props);
        const {onFolderConf} = this.props;
        let yestoday = 24 * 60 * 60 * 1000;
        let currentTime = +new Date();
        this.state = {
            folderConf: onFolderConf,
            reportDetail: null,
            dateRange: {
                startdate: moment(new Date(currentTime - yestoday * 6)).format(dateFormat).toString(),
                enddate: moment(new Date(currentTime - yestoday)).format(dateFormat).toString()
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        const {dateRange} = this.state;
        this.setState({folderConf: nextProps.onFolderConf});
        this.handleInitFileDetail(nextProps.onFolderConf,dateRange);
    }
    handleDealTable(thead, data) {
        const columns = [];
        const dataSource = [];
        thead.map((item, i) => {
            ((item, index) => {
                columns.push({
                    title: item.title,
                    dataIndex: item.title,
                    key: item.title,
                    sorter: (a, b) => a[item.title] - b[item.title]
                });
            })(item, i)
        })
        data.map((item, i) => {
            const obj = {};
            item.map((superItem, k) => {
                obj[thead[k]] = superItem
                    ? superItem
                    : '-'
            });
            dataSource.push(obj)
        })

        return {columns: columns, dataSource: dataSource};
    }
    componentDidMount() {
        const {folderConf,dateRange} = this.state;
        this.handleInitFileDetail(folderConf,dateRange);
    }
    handleInitFileDetail(folderConf,dateRange) {
        const dateFormatRange = {
            startdate: dateRange.startdate.split('-').join(''),
            enddate:dateRange.enddate.split('-').join('')
        }
        http.get('/api/?c=table.tables&ac=index&id=' + folderConf.fileId, {params: dateFormatRange}).then(data => data.data).then(data => {
            if (data.errcode === 10000) {
                console.log(data.data);
                let thead = _.concat(data.data.table_conf.fields.dimension_fields,data.data.table_conf.fields.data_fields);
                console.log(thead,'@thead');
                console.log(this.handleDealTable(thead,data.data.data));
                this.setState({reportDetail: data.data})
            }
        })
    }
    handleSizeChange(e) {
        this.setState({size: e.target.value});
    }
    handleChangeDateRange(date, dateString) {
        const {folderConf} = this.state;
        const dateRange = {
            startdate: dateString[0],
            enddate: dateString[1]
        };
        this.handleInitFileDetail(folderConf,dateRange)
        this.setState({dateRange: dateRange})
    }
    render() {
        const {reportDetail, dateRange} = this.state;
        return (
            <div>
                {reportDetail
                    ? <div className="report-box">
                            <div className="report-header">
                                <div className="report-label">
                                    <div className="header-left">
                                        <h4>
                                            {reportDetail.title}
                                        </h4>
                                    </div>
                                    <div className="header-right">
                                        <Button type="primary">
                                            <Icon type="plus-circle-o"/>
                                            添加工作表
                                        </Button>
                                        <Button type="primary">
                                            <Icon type="edit"/>
                                            编辑工作表
                                        </Button>
                                        <Button type="primary">
                                            <Icon type="area-chart"/>
                                            生成图表
                                        </Button>
                                    </div>
                                </div>
                                <div className="report-label">
                                    <div className="label-l">
                                        时间：
                                    </div>
                                    <div className="label-r">
                                        <RangePicker style={{
                                            width: '200px'
                                        }} defaultValue={[
                                            moment(dateRange.startdate, dateFormat),
                                            moment(dateRange.enddate, dateFormat)
                                        ]} onChange={this.handleChangeDateRange.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : <div className="report-empty">
                        空
                    </div>}
            </div>
        )
    }
}
