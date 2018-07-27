import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { Helmet } from 'react-helmet'
import FactoryPage from './FactoryPage'

class Facotry extends React.Component {
  render () {
    return (
      <div>
        <Helmet>
          <title>{'Make a picture'}</title>
        </Helmet>
        <FactoryPage {...this.props} />
      </div>
    )
  }
}

export default Facotry
