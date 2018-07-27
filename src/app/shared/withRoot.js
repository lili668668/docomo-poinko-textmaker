import React from 'react'
import PropTypes from 'prop-types'
import AppWrapper from './shared/AppWrapper'
import pages from './pages'

function findActivePage(currentPages, match) {
  const activePage = currentPages.find(page => match.path === page.pathname)
  return activePage
}

function withRoot(Component) {
  class WithRoot extends React.Component {
    getChildContext () {
      const { match } = this.props
        return {
          pages,
          activePage: findActivePage(pages, match)
        }
    }

    render () {
      return (
        <AppWrapper>
          <Component { ...this.props } />
        </AppWrapper>
      )
    }
  }

  WithRoot.propTypes = {
    match: PropTypes.object.isRequired
  }

  WithRoot.childContextTypes = {
    pages: PropTypes.array,
    activePage: PropTypes.object
  }

  return WithRoot
}

export default withRoot
