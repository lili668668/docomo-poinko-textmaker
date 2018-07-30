import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextMaker from './TextMaker'
import poinkos from '../../assets/poinkos'

const styles = theme => ({
})

function FactoryPage (props) {
  const { classes, match, t } = props
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

export default withStyles(styles)(FactoryPage)
