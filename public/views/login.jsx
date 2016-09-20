'use strict';

import React from 'react';
import Auth from '../lib/auth';
import { withRouter, Link } from 'react-router'

const Login = React.createClass({

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    Auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/app')
      }
    })
  },

  render() {
    return (
      <div id='login'>
        <h1>使用身份证登录云账户（不需任何商户信息）</h1>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label><br/>
          <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
          <button type="submit">login</button>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>

        <Link to='/app/mock'>
          模拟商户链接登录云账户
        </Link>
      </div>
    )
  }

});


// 本项目用了 react-engine 未实际支持的 react-router 2.*（具体为 ^2.4.0），
// 但 react-router 说过是平滑升级的，所以用了后除了 deprecated 的信息，
// 暂也没发现 BUG：
// https://github.com/reactjs/react-router/blob/master/upgrade-guides/v2.0.0.md
//
// withRouter 就是 2.4.0 中新加的方法（使用时还未发布），如果路由出问题，可以细查：
// https://github.com/reactjs/react-router/blob/master/upgrade-guides/v2.4.0.md
export default withRouter(Login)
