import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, withState, withHandlers } from 'recompose'
import ButtonBase from '@material-ui/core/ButtonBase'
import Popover from '@material-ui/core/Popover'
import { CustomPicker as withColorWrap } from 'react-color'
import { Saturation } from 'react-color/lib/components/common'
import ColorPickerPointer from './ColorPickerPointer'

const styles = theme => ({
  colorSection: {
    width: '36px',
    height: '14px',
    borderRadius: '2px'
  },
  outline: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 2px rgba(0,0,0,.1)',
    display: 'inline-block'
  },
  section: {
    width: '300px',
    height: '400px'
  },
  saturation: {
    width: '100%',
    paddingBottom: '55%',
    position: 'relative',
    borderRadius: '2px 2px 0 0',
    overflow: 'hidden'
  }
})

function ColorPicker (props) {
  const { classes, ...otherProps } = props
  const { t, state, rgb } = otherProps
  const {
    handleColorSectionClick,
    handleColorClose
  } = props
  const {
    anchorEl
  } = state
  const backgroundCSS = { background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})` }
  return (
    <div>
      <ButtonBase onClick={handleColorSectionClick}>
        <div className={classes.outline}>
          <div className={classes.colorSection} style={backgroundCSS}></div>
        </div>
      </ButtonBase>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleColorClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.section}>
          <Saturation
            className={classes.saturation}
            {...otherProps}
            pointer={ColorPickerPointer}
          />
        </div>
      </Popover>
    </div>
  )
}

ColorPicker.propsTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
}

const handlers = {
  handleColorSectionClick: ({ state, setState }) => (event) => {
    setState({ ...state, anchorEl: event.currentTarget })
  },
  handleColorClose: ({ state, setState }) => () => {
    setState({ ...state, anchorEl: null })
  }
}

const initialState = (props) => ({
  anchorEl: null
})

export default compose(
  withColorWrap,
  withState('state', 'setState', initialState),
  withHandlers(handlers),
  withStyles(styles)
)(ColorPicker)
