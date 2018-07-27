import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { Helmet } from 'react-helmet'
import HomePage from './HomePage'

class Home extends React.Component {
  render () {
    const { classes } = this.props
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

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default Home