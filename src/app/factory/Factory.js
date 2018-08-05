import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { Helmet } from 'react-helmet'
import FactoryPage from './FactoryPage'
import withFrame from '../shared/withFrame'
import withRoot from '../shared/withRoot'

class Facotry extends React.Component {
  render () {
    const { t } = this.props
    return (
      <div>
        <Helmet>
          <title>{t('Make a picture')}</title>
        </Helmet>
        <FactoryPage {...this.props} />
      </div>
    )
  }
}

Facotry.propTypes = {
  t: PropTypes.func.isRequired
}

export default compose(
  withRoot,
  withFrame
)(Facotry)
