import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import Konva from 'konva'
import { Stage, Layer, Image, Text, Rect } from 'react-konva'
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
    handleFontSizeChange,
    handleTextDragStart,
    handleTextDragEnd,
    handleResetTextPosition
  } = props
  const {
    image,
    text,
    fontSize,
    textX,
    textY,
    textBorderColor
  } = state
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
            x={textX}
            y={textY}
            text={text}
            align="center"
            fill="white"
            fontSize={fontSize}
            fontFamily="Noto Sans CJK TC, Microsoft JhengHei, Microsoft YaHei, sans-serif"
            fontStyle="bold"
            stroke="black"
          />
          <Rect
            width={width}
            height={fontSize}
            x={textX}
            y={textY}
            stroke={textBorderColor}
            onDragStart={handleTextDragStart}
            onDragEnd={handleTextDragEnd}
            draggable
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
      <Button onClick={handleResetTextPosition}>
        reset position
      </Button>
    </div>
  )
}

TextMaker.propsTypes = {
  picture: PropTypes.string.isRequire,
  defaultFontSize: PropTypes.number,
  defaultTextX: PropTypes.number,
  defaultTextY: PropTypes.number
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
  },
  handleTextDragStart: ({ state, setState }) => (event) => {
    setState({ ...state, textBorderColor: 'red' })
  },
  handleTextDragEnd: ({ state, setState, picture: { width, height } }) => (event) => {
    let x = event.target.x()
    let y = event.target.y()
    if (x > width * 2) x = 0
    if (x < 0 - width) x = 0
    if (y > height) y = height - 100
    if (y < 0) y = 0
    setState({ ...state, textX: x, textY: y, textBorderColor: 'transparent' })
  },
  handleResetTextPosition: ({ state, setState, ...props }) => () =>{
    setState({ ...state, ...(initialTextPosition(props)) })
  }
}

const initialState = (props) => ({
  image: null,
  stageRef: null,
  text: '',
  ...(initialTextPosition(props)),
  fontSize: props.defaultFontSize || 50,
  textBorderColor: 'transparent'
})

const initialTextPosition = (props) => ({
  textX: props.defaultTextX || 0,
  textY: props.defaultTextY || (props.picture.height - 100)
})

export default compose(
  withStyles(styles),
  withState('state', 'setState', initialState),
  withHandlers(handlers),
  lifecycle(lifecycles)
)(TextMaker)
