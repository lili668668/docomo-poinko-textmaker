import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TextMaker from './TextMaker'
import poinkos from '../../assets/poinkos'

function FactoryPage (props) {
  const { match, t } = props
  const target = poinkos.find(poinko => poinko.key === match.params.id)
  return (
    <div>
      <Grid container>
        <Grid item xs />
        <Grid item xs>
          <TextMaker picture={target} t={t} />
        </Grid>
        <Grid item xs />
      </Grid>
    </div>
  )
}

FactoryPage.propsTypes = {
  match: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default FactoryPage
