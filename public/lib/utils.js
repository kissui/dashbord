'use strict';
import Auth from './auth';
import _isEmpty from 'lodash/isEmpty';


/*
    项目中一些公用的方法
*/

const YUNZH_STR = /kepler/g;
let proxyName;

export function isEmpty(obj) {
    return _isEmpty(obj);
}

export function isServerRender(app) {
    return app.props.serverSide             // 是 serverSide render
        && !_isEmpty(app.props.initialState) // 且设置了初始数据
}

export function isBrowserSide() {
    try {
        return !_isEmpty(window)
    }
    catch (e) {
        return false;
    }
}

export default {

    inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    },
    // 简单的交互延迟通知功能
    delayPop(txt,delay,callback){
        let body = document.body;
        let popBox = document.createElement("div"),
            txtHtml = "",
            idName = "kepler-pop-note";
        
        popBox.id = idName;
        txtHtml += '<p>'+txt+'</p>';
        popBox.innerHTML = txtHtml; 

        if (!document.getElementById(idName)) {
            return (function(){
                    body.appendChild(popBox);
                    setTimeout(function(){
                        body.removeChild(popBox);

                        if(callback){
                            callback();
                        }
                    },delay);

            })();
        }
        
    }
}

