import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%'
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto'
  },
  appBar: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute'
    }
  },
  appBarHome: {
    boxShadow: 'none'
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: '100%'
    }
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  content: {
    marginTop: 68,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto'
  }
})

class AppFrame extends React.Component {
  state = {
    mobileOpen: false
  }

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true })
  }

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false })
  }

  render () {
    const { children, classes, t } = this.props

    if (!this.context.activePage) {
      throw new Error('Missing activePage.')
    }

    const title = this.context.activePage.title !== false ? this.context.activePage.title : null
    const appBar = this.context.activePage.appBar !== false

    let disablePermanent = false
    let navIconClassName = ''
    let appBarClassName = classes.appBar

    if (title === null) {
      // home route, don't shift app bar or dock drawer
      disablePermanent = true
      appBarClassName += ` ${classes.appBarHome}`
    } else {
      navIconClassName = classes.navIconHide
      appBarClassName += ` ${classes.appBarShift}`
    }

    return (
      <div className={classes.root}>
        {appBar && (
          <AppBar className={appBarClassName}>
            <Toolbar>
              {title !== null && (
                <Typography className={classes.title} variant="title" color="inherit" noWrap>
                  {title}
                </Typography>
              )}
            </Toolbar>
          </AppBar>
        )}
        <div className={classes.content}>
          {children}
        </div>
      </div>
    )
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

AppFrame.contextTypes = {
  activePage: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  router: PropTypes.object.isRequired
}

export default withStyles(styles)(AppFrame)
