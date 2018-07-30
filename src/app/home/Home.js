import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { Helmet } from 'react-helmet'
import HomePage from './HomePage'
import withRoot from '../shared/withRoot'

class Home extends React.Component {
  render () {
    return (
      <div>
        <Helmet>
          <title>{'Docomo Poinko Text Maker'}</title>
        </Helmet>
        <HomePage {...this.props} />
      </div>
    )
  }
}

export default compose(
  withRoot
)(Home)
