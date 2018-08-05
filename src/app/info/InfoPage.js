import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  info: {
    padding: 16
  }
})

function InfoPage (props) {
  const { classes } = props
  return (
    <div className={classes.info}>
      <Typography variant="title" align="center">關於鸚鵡兄弟產生器</Typography>
      <Typography variant="body2" align="center">本網站構想與圖源，來源於此專案：<a href="https://github.com/r3850355/yinwubrother-textmaker">yinwubrother-textmaker</a></Typography>
      <Typography variant="body2" align="center">本網站專案網址於：<a href="https://github.com/lili668668/docomo-poinko-textmaker">{ 'https://github.com/lili668668/docomo-poinko-textmaker' }</a></Typography>
      <Typography variant="body2" align="center">如有任何問題皆可於 GitHub 上提出，或寄信至 lili668668@gmail.com </Typography>
    </div>
  )
}

export default withStyles(styles)(InfoPage)
