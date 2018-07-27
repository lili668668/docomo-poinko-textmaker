import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import poinkos from '../../assets/poinkos'

const styles = theme => ({

})

function HomePage (props) {
  const { classes } = props
  return (
    <div>
      <GridList cellHeight={300} cols={4}>
        {poinkos.map(poinko => (
          <GridListTile key={poinko.src} cols={1}>
            <img src={poinko.src} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default HomePage
