import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, withState, withHandlers } from 'recompose'
import ButtonBase from '@material-ui/core/ButtonBase'
import TextField from '@material-ui/core/TextField'
import Popover from '@material-ui/core/Popover'
import { CustomPicker as withColorWrap } from 'react-color'
import { Saturation, Alpha, Hue } from 'react-color/lib/components/common'
import BarPointer from './BarPointer'
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
  paddingTopWrap: {
    paddingTop: '8px'
  },
  popoverSection: {
    width: '300px',
    height: '400px'
  },
  saturationSection: {
    width: '300px',
    height: '300px',
    position: 'relative',
  },
  alphaSection: {
    height: '10px',
    position: 'relative',
  },
  hueSection: {
    height: '10px',
    position: 'relative',
  },
  rgbaSection: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textSection: {
    width: '23%',
    paddingRight: '1%',
    paddingLeft: '1%'
  },
  text: {
    width: '100%'
  },
  saturation: {
    width: '100%',
    paddingBottom: '55%',
    position: 'relative',
    borderRadius: '2px 2px 0 0',
    overflow: 'hidden'
  }
})

const numeral = (something) => {
  if (!something) return 0
  return Number(something)
}

const calculA = (a) => {
  if (!a) return 0
  const fa = Number(a)
  if (fa < 0) return 0
  if (fa > 1) return 1
}

function ColorPicker (props) {
  const { classes, ...otherProps } = props
  const { t, state, rgb, onChange } = otherProps
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
        <div className={classes.popoverSection}>
          <div className={classes.saturationSection}>
            <Saturation
              className={classes.saturation}
              {...otherProps}
              pointer={ColorPickerPointer}
            />
          </div>
          <div className={classes.paddingTopWrap}>
            <div className={classes.hueSection}>
              <Hue
                {...otherProps}
                pointer={BarPointer}
              />
            </div>
          </div>
          <div className={classes.paddingTopWrap}>
            <div className={classes.alphaSection}>
              <Alpha
                {...otherProps}
                pointer={BarPointer}
              />
            </div>
          </div>
          <div className={classes.rgbaSection}>
            <span className={classes.textSection}>
              <TextField
                className={classes.text}
                label={'R'}
                value={rgb.r}
                onChange={(event) => {
                  onChange({ ...rgb, r: numeral(event.target.value), source: 'rgb' })
                }}
              />
            </span>
            <span className={classes.textSection}>
              <TextField
                className={classes.text}
                label={'G'}
                value={rgb.g}
                onChange={(event) => {
                  onChange({ ...rgb, g: numeral(event.target.value), source: 'rgb' })
                }}
              />
            </span>
            <span className={classes.textSection}>
              <TextField
                className={classes.text}
                label={'B'}
                value={rgb.b}
                onChange={(event) => {
                  onChange({ ...rgb, b: numeral(event.target.value), source: 'rgb' })
                }}
              />
            </span>
            <span className={classes.textSection}>
              <TextField
                className={classes.text}
                label={'A'}
                value={rgb.a}
                onChange={(event) => {
                  onChange({ ...rgb, a: event.target.value, source: 'rgb' })
                }}
              />
            </span>
          </div>
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
