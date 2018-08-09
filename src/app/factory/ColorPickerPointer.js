import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  pointer: {
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    transform: 'translate(-6px, -1px)',
    backgroundColor: 'rgb(248, 248, 248)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
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
