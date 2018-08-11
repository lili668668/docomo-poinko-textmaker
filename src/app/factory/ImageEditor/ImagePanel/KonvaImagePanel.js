import React from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer, Image, Text, Rect } from 'react-konva'

function KonvaImagePanel (props) {
  return (
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
  )
}
