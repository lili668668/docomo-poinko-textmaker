import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import poinkos from '../../assets/poinkos'

const styles = theme => ({

})

function HomePage (props) {
  const { classes } = props
  return (
    <div>
      {poinkos.map(poinko => (<img src={poinko.src} />))}
    </div>
  )
}

export default HomePage
