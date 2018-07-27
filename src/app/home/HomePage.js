import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import ButtonBase from '@material-ui/core/ButtonBase'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import poinkos from '../../assets/poinkos'

const styles = theme => ({
  link: {
    width: '100%',
    height: '100%'
  },
  picture: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
})

function HomePage (props) {
  const { classes } = props
  return (
    <div>
      <GridList cellHeight={300} cols={4}>
        {poinkos.map(poinko => (
          <GridListTile key={poinko.key} cols={1}>
            <ButtonBase component={Link} to={`/factory/${poinko.key}`} className={classes.link}>
              <img src={poinko.src} className={classes.picture} />
            </ButtonBase>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default withStyles(styles)(HomePage)
