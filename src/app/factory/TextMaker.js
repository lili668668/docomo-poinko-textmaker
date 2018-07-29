import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import Konva from 'konva'
import { Stage, Layer, Image, Text } from 'react-konva'
import Button from '@material-ui/core/Button'

const styles = theme => ({
})

function TextMaker (props) {
  const { classes, state } = props
  const { handleClick, handleStageRef } = props
  const { image } = state
  return (
    <div>
      <Button onClick={handleClick}>
        Download
      </Button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={handleStageRef}
      >
        <Layer>
          <Image image={image} />
          <Text
            text="tmp"
            fontSize={300}
          />
        </Layer>
      </Stage>
    </div>
  )
}

TextMaker.propsTypes = {
  picture: PropTypes.string.isRequire
}

const lifecycles = {
  componentDidMount() {
    const image = new window.Image()
    image.src = this.props.picture
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
