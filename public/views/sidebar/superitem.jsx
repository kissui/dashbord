'use strict';

import React from 'react';

class SidebarMenuSuperItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeSuperList(i) {
        console.log(i)
    }

    render() {
        let me = this;
        return (
            <ul className="nav child_menu">
                {
                    this.props.menu.map(function (item, i) {
                        return (
                            <li key={i}>
                                <a onClick={me.handleChangeSuperList.bind(null, i)}>
                                    <i className={item.icon}></i>
                                    {item.title}
                                    <i className="fa fa-pencil"></i>
                                </a>

                            </li>
                        )
                    })
                }

            </ul>
        )
    }
}
export default SidebarMenuSuperItem;