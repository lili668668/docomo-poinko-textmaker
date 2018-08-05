import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import pages from './pages'

function App (props, context) {
  const { history } = props
  return (
    <Router history={history}>
      <Switch>
        {pages.map(page => ( <Route key={page.pathname} path={page.pathname} exact component={page.component} /> ))}
      </Switch>
    </Router>
  )
}

App.propTypes = {
  history: PropTypes.object
}

export default App
