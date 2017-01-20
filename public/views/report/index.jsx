'use strict';
import React from 'react';
import ReportLayout from './layout/layout';
import ReportContent from './content';
import _ from 'lodash';
export default class reportIndexPage extends React.Component {
    constructor(context, props) {
        super(context, props);
        this.context.router;
        this.state = {
            folderConf: null,
            isHasParams: false
        }
    }
    handleReceiveFolderConf(folderConf) {
        const {isHasParams} = this.state;
        if (_.isObject(folderConf) && !isHasParams){
            this.setState({folderConf: folderConf})
        }
    }
    handleClickFolderListItem(folderConf) {
        this.setState({
            folderConf: folderConf
        })
        this.context.router.push({pathname:'/index/report/test/'+folderConf.folderId +'/'+folderConf.fileId})
    }
    componentDidMount() {
        const {location, params} = this.props;
        if (!_.isEmpty(params)) {

            this.setState({
                folderConf: {
                    fileId: params.fileId,
                    folderId: params.folderId
                },
                isHasParams: true
            })
        }
    }
    render() {
        const {folderConf, isHasParams} = this.state;
        return (
            <div>
                <ReportLayout onReceiveFolderConf={this.handleReceiveFolderConf.bind(this)} onFolderConf={folderConf} onSendParams={isHasParams}
                onChange={this.handleClickFolderListItem.bind(this)}>
                    {folderConf && <ReportContent onFolderConf={folderConf}/>}
                </ReportLayout>
            </div>
        )
    }
}
reportIndexPage.contextTypes = {
    router: Object
}
