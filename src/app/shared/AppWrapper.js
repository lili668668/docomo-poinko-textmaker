import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppFrame from './AppFrame'

function AppWrapper (props) {
  const { children } = props
  return (
    <MuiThemeProvider>
      <CssBaseline />
      <AppFrame {...props}>{children}</AppFrame>
    </MuiThemeProvider>
  )
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppWrapper
