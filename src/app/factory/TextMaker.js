import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import Konva from 'konva'
import { Stage, Layer, Image, Text, Rect } from 'react-konva'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  picture: {
    paddingTop: 30,
    paddingBottom: 30
  },
  formItem: {
    marginTop: 15,
    marginBottom: 15
  },
  button: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  positionInput: {
    width: '48%',
    marginLeft: '1%',
    marginRight: '1%'
  }
})

function TextMaker (props) {
  const { classes, picture, state } = props
  const {
    handleDownload,
    handleStageRef,
    handleTextChange,
    handleFontSizeChange,
    handleTextXChange,
    handleTextYChange,
    handleTextDragEnd,
    handleResetTextPosition,
    handleFilenameChange
  } = props
  const {
    image,
    text,
    fontSize,
    textX,
    textY,
    filename
  } = state
  const width = picture.width
  const height = picture.height
  return (
    <div>
      <div className={classes.picture}>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item xs>
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
                  onDragEnd={handleTextDragEnd}
                  draggable
                />
              </Layer>
            </Stage>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
      <div>
        <TextField
          className={classes.formItem}
          label="Text"
          value={text}
          onChange={handleTextChange}
          fullWidth
          multiline
        />
        <TextField
          className={classes.formItem}
          label="Text Size"
          type="number"
          value={fontSize}
          onChange={handleFontSizeChange}
          fullWidth
        />
        <div className={classes.formItem}>
          <p>You can drag text to move it.</p>
          <div className={classes.container}>
            <TextField
              className={classes.positionInput}
              label="X"
              type="number"
              value={textX}
              onChange={handleTextXChange}
            />
            <TextField
              className={classes.positionInput}
              label="Y"
              type="number"
              value={textY}
              onChange={handleTextYChange}
            />
            <Button onClick={handleResetTextPosition} className={classes.button}>
              reset position
            </Button>
          </div>
        </div>
        <div className={classes.formItem}>
          <TextField
            label="Filename"
            value={filename}
            onChange={handleFilenameChange}
            fullWidth
          />
          <Button
            onClick={handleDownload}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Download
          </Button>
        </div>
      </div>
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
  handleDownload: ({ state: { stageRef, filename } }) => () => {
    const url = stageRef.getStage().toDataURL()
    const a = document.createElement('a')
    a.style.display = 'none'
    a.setAttribute('download', `${filename}.png`)
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
    setState({ ...state, fontSize: value || event.target.value })
  },
  handleTextDragEnd: ({ state, setState, picture: { width, height } }) => (event) => {
    const x = event.target.x()
    const y = event.target.y()
    setState({ ...state, textX: x, textY: y })
  },
  handleTextXChange: ({ state, setState }) => (event) => {
    setState({ ...state, textX: parseInt(event.target.value) })
  },
  handleTextYChange: ({ state, setState }) => (event) => {
    setState({ ...state, textY: parseInt(event.target.value) })
  },
  handleResetTextPosition: ({ state, setState, ...props }) => () => {
    setState({ ...state, ...(initialTextPosition(props)) })
  },
  handleFilenameChange: ({ state, setState }) => (event) => {
    setState({ ...state, filename: event.target.value })
  }
}

const initialState = (props) => ({
  image: null,
  stageRef: null,
  text: '',
  ...(initialTextPosition(props)),
  fontSize: props.defaultFontSize || 50
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
