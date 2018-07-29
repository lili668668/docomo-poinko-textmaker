import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextMaker from './TextMaker'
import poinkos from '../../assets/poinkos'

const styles = theme => ({
})

function FactoryPage (props) {
  const { classes, match } = props
  const target = poinkos.find(poinko => poinko.key === match.params.id)
  return (
    <div>
      <TextMaker picture={target} />
    </div>
  )
}

export default withStyles(styles)(FactoryPage)
