import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import pages from './pages'

function App (props, context) {
  const { history } = props
  const { store } = context
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {pages.map(page => ( <Route path={page.pathname} exact component={page.component} /> ))}
      </Switch>
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object
}

App.contextTypes = {
  store: PropTypes.object
}

export default App
