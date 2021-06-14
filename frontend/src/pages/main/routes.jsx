import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import App from './app'
import Dashboard from '../dashboard/dashboard'
import User from '../user/user'
import Call from '../call/call'
import Payment from '../payment/payment'
import Configuration from '../configuration/configuration'

export default props => (

    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Dashboard} />
            <Route path='/user' component={User} />
            <Route path='/call' component={Call} />
            <Route path='/payment' component={Payment} />
            <Route path='/configuration' component={Configuration} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)