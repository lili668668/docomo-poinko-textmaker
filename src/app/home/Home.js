import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { Helmet } from 'react-helmet'
import HomePage from './HomePage'
import withFrame from '../shared/withFrame'
import withRoot from '../shared/withRoot'

class Home extends React.Component {
  render () {
    const { t } = this.props
    return (
      <div>
        <Helmet>
          <title>{t('Docomo Poinko Text Maker')}</title>
        </Helmet>
        <HomePage {...this.props} />
      </div>
    )
  }
}

export default compose(
  withRoot,
  withFrame
)(Home)
