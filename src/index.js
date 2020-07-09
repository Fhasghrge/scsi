import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'normalize.css/normalize.css'
import 'antd/dist/antd.css'

import Login from './component/login/Login.jsx'
import Manage from './component/manage/Manage.jsx'
import store from './store/index'

import './mock/login.js'
import './mock/userinfo.js'
import './mock/todaysigninfo.js'
import './mock/changeinfo.js'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/' exact component={Login}></Route>
        <Route path='/manage' exact component={Manage}></Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)