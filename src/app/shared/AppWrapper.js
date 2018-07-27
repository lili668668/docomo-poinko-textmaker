import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

function AppWrapper (props) {
  const { children } = props
  return (
    <MuiThemeProvider>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppWrapper
