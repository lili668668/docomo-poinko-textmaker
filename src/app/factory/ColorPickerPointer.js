import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  pointer: {
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    boxShadow: 'inset 0 0 0 1px #fff',
    transform: 'translate(-6px, -6px)',
  }
})

function ColorPickerPointer (props) {
  const { classes } = props
  return (
    <div className={classes.pointer}></div>
  )
}

ColorPickerPointer.propsTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ColorPickerPointer)
