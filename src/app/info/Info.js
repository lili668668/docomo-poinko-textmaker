import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { Helmet } from 'react-helmet'
import InfoPage from './InfoPage'
import withFrame from '../shared/withFrame'
import withRoot from '../shared/withRoot'

class Info extends React.Component {
  render () {
    const { t } = this.props
    return (
      <div>
        <Helmet>
          <title>{t('About this Textmaker')}</title>
        </Helmet>
        <InfoPage {...this.props} />
      </div>
    )
  }
}

export default compose(
  withRoot,
  withFrame
)(Info)
