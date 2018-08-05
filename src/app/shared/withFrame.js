import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import InfoIcon from '@material-ui/icons/Info'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%'
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto',
    flexGrow: 1
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
  },
  infoIcon: {
    right: 0
  }
})

function withFrame(Component) {
  class WithFrame extends React.Component {
    state = {
      mobileOpen: false
    }

    handleDrawerOpen = () => {
      this.setState({ mobileOpen: true })
    }

    handleDrawerClose = () => {
      this.setState({ mobileOpen: false })
    }

    handleLastPageClick = () => {
      this.props.history.push('/')
    }

    handleInfoClick = () => {
      this.props.history.push('/info')
    }

    render () {
      const { children, classes, t } = this.props

      if (!this.context.activePage) {
        throw new Error('Missing activePage.')
      }

      const lastPage = this.context.activePage.lastPage !== false ? this.context.activePage.lastPage : null
      const title = this.context.activePage.title !== false ? this.context.activePage.title : null
      const appBar = this.context.activePage.appBar !== false

      let disablePermanent = false
      let navIconClassName = ''
      let appBarClassName = classes.appBar

      if (title === null) {
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
                {lastPage !== null && (
                  <IconButton
                    color="inherit"
                    onClick={this.handleLastPageClick}
                  >
                    <KeyboardBackspaceIcon />
                  </IconButton>
                )}
                {title !== null && (
                  <Typography className={classes.title} variant="title" color="inherit" noWrap>
                    {t(title)}
                  </Typography>
                )}
                <IconButton
                  color="inherit"
                  onClick={this.handleInfoClick}
                >
                  <InfoIcon className={classes.infoIcon} />
                </IconButton>
              </Toolbar>
            </AppBar>
          )}
          <div className={classes.content}>
            <Component { ...this.props } />
          </div>
        </div>
      )
    }
  }

  WithFrame.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired
  }

  WithFrame.contextTypes = {
    activePage: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    router: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  }

  return withStyles(styles)(WithFrame)
}

export default withFrame
