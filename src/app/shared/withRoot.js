import React from 'react'
import PropTypes from 'prop-types'
import { I18nextProvider, translate } from 'react-i18next'
import CssBaseline from '@material-ui/core/CssBaseline'
import pages from '../pages'
import i18n from './i18n'

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
        <I18nextProvider i18n={i18n}>
          <div>
            <CssBaseline />
            <Component { ...this.props } />
          </div>
        </I18nextProvider>
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

  return translate()(WithRoot)
}

export default withRoot
