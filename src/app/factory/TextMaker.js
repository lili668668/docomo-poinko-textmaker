import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import Konva from 'konva'
import { Stage, Layer, Image, Text } from 'react-konva'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
})

function TextMaker (props) {
  const { classes, picture, state } = props
  const { handleClick, handleStageRef, handleTextChange } = props
  const { image, text } = state
  const width = picture.width
  const height = picture.height
  return (
    <div>
      <Button onClick={handleClick}>
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
            fontSize={50}
            fontFamily="Noto Sans CJK TC, Microsoft JhengHei, Microsoft YaHei, sans-serif"
          />
        </Layer>
      </Stage>
      <TextField
        value={text}
        onChange={handleTextChange}
      />
    </div>
  )
}

TextMaker.propsTypes = {
  picture: PropTypes.string.isRequire
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
  handleClick: ({ state: { stageRef } }) => () => {
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
  }
}

export default compose(
  withStyles(styles),
  withState('state', 'setState', {
    image: null,
    stageRef: null,
    downloadUrl: null
  }),
  withHandlers(handlers),
  lifecycle(lifecycles)
)(TextMaker)
