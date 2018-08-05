import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { Stage, Layer, Image, Text, Rect } from 'react-konva'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
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
  buttonHalf: {
    width: '48%',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: '1%',
    marginRight: '1%'
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

const getWidthAndHeight = (picture) => {
  const isWindowSmallerThanPicture = picture.width > window.innerWidth
  const width = isWindowSmallerThanPicture ? window.innerWidth : picture.width
  const height = isWindowSmallerThanPicture ? picture.height * (window.innerWidth / picture.width) : picture.height
  return { width, height }
}

function TextMaker (props) {
  const { classes, picture, state, t } = props
  const {
    handleProduce,
    handleUnproduce,
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
    filename,
    isDownloading,
    downloadUrl
  } = state
  const { width, height } = getWidthAndHeight(picture)
  const downloadName = filename !== undefined && filename !== '' ? filename : 'poinko'
  return (
    <div>
      <div className={classes.picture}>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item xs>
            {!isDownloading && (
              <Stage
                width={width}
                height={height}
                ref={handleStageRef}
              >
                <Layer>
                  <Image
                    image={image}
                    width={width}
                    height={height}
                  />
                  <Rect
                    width={width}
                    height={height}
                    preventDefault={false}
                  />
                  {(text !== undefined && text !== '') && (
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
                  )}
                </Layer>
              </Stage>
            )}
            {isDownloading && (
              <img src={downloadUrl} alt="poinko" />
             )}
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
      {!isDownloading && (
        <div>
          <TextField
            className={classes.formItem}
            label={t('Text')}
            value={text}
            onChange={handleTextChange}
            fullWidth
            multiline
          />
          <TextField
            className={classes.formItem}
            label={t('Text Size')}
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            fullWidth
          />
          <div className={classes.formItem}>
            <p>{t('You can drag text to move it')}</p>
            <div className={classes.container}>
              <TextField
                className={classes.positionInput}
                label={t('X')}
                type="number"
                value={textX}
                onChange={handleTextXChange}
              />
              <TextField
                className={classes.positionInput}
                label={t('Y')}
                type="number"
                value={textY}
                onChange={handleTextYChange}
              />
              <Button onClick={handleResetTextPosition} className={classes.button}>
                {t('Reset Position')}
              </Button>
            </div>
          </div>
        </div>
      )}
      {!isDownloading && (
        <Button
          onClick={handleProduce}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          {t('Produce a picture')}
        </Button>
      )}
      {isDownloading && (
        <div className={classes.formItem}>
          <TextField
            label={t('Filename')}
            value={filename}
            onChange={handleFilenameChange}
            fullWidth
          />
          <Button
            component="a"
            href={downloadUrl}
            download={`${downloadName}.png`}
            className={classes.buttonHalf}
            variant="contained"
            color="primary"
          >
            {t('Download')}
          </Button>
        <Button
          onClick={handleUnproduce}
          className={classes.buttonHalf}
          variant="contained"
          color="secondary"
        >
          {t('Back to fix picture')}
        </Button>
        </div>
       )}
    </div>
  )
}

TextMaker.propsTypes = {
  classes: PropTypes.object.isRequired,
  picture: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
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
  handleProduce: ({ state, setState }) => () => {
    setState({ ...state, downloadUrl: state.stageRef.getStage().toDataURL(), isDownloading: true })
  },
  handleUnproduce: ({ state, setState }) => () => {
    setState({ ...state, isDownloading: false })
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
    setState({ ...state, textX: parseInt(event.target.value, 10) })
  },
  handleTextYChange: ({ state, setState }) => (event) => {
    setState({ ...state, textY: parseInt(event.target.value, 10) })
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
  fontSize: props.defaultFontSize || 50,
  isDownloading: false,
  downloadUrl: '',
  filename: ''
})

const initialTextPosition = (props) => ({
  textX: props.defaultTextX || 0,
  textY: props.defaultTextY || (getWidthAndHeight(props.picture).height - 100)
})

export default compose(
  withStyles(styles),
  withState('state', 'setState', initialState),
  withHandlers(handlers),
  lifecycle(lifecycles)
)(TextMaker)
