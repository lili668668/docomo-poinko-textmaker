import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import Konva from 'konva'
import { Stage, Layer, Image, Text } from 'react-konva'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/lab/Slider'

const styles = theme => ({
  slider: {
    width: 300
  }
})

function TextMaker (props) {
  const { classes, picture, state } = props
  const {
    handleDownload,
    handleStageRef,
    handleTextChange,
    handleFontSizeChange
  } = props
  const { image, text, fontSize } = state
  const width = picture.width
  const height = picture.height
  return (
    <div>
      <Button onClick={handleDownload}>
        Download
      </Button>
      <Stage
        width={width}
        height={height}
        ref={handleStageRef}
      >
        <Layer>
          <Image image={image} />
          <Text
            width={width}
            y={height - 100}
            text={text}
            align="center"
            fill="white"
            fontSize={fontSize}
            fontFamily="Noto Sans CJK TC, Microsoft JhengHei, Microsoft YaHei, sans-serif"
          />
        </Layer>
      </Stage>
      <TextField
        value={text}
        onChange={handleTextChange}
      />
      <div className={classes.slider}>
        <Slider value={fontSize} onChange={handleFontSizeChange} />
      </div>
    </div>
  )
}

TextMaker.propsTypes = {
  picture: PropTypes.string.isRequire,
  defaultFontSize: PropTypes.number
}

const lifecycles = {
  componentDidMount() {
    const image = new window.Image()
    image.src = this.props.picture.src
    image.onload = () => {
      this.props.setState({ ...this.props.state, image })
    }
  }
}

const handlers = {
  handleDownload: ({ state: { stageRef } }) => () => {
    const url = stageRef.getStage().toDataURL()
    const filename = 'poinko.png'
    const a = document.createElement('a')
    a.style.display = 'none'
    a.setAttribute('download', filename)
    a.setAttribute('target', '_blank')
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  },
  handleStageRef: ({ state, setState }) => (node) => {
    setState({ ...state, stageRef: node })
  },
  handleTextChange: ({ state, setState }) => (event) => {
    setState({ ...state, text: event.target.value })
  },
  handleFontSizeChange: ({ state, setState }) => (event, value) => {
    setState({ ...state, fontSize: value })
  }
}

const initialState = (props) => ({
  image: null,
  stageRef: null,
  text: '',
  fontSize: props.defaultFontSize || 50
})

export default compose(
  withStyles(styles),
  withState('state', 'setState', initialState),
  withHandlers(handlers),
  lifecycle(lifecycles)
)(TextMaker)
