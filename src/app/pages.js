import Home from './home/Home'
import Factory from './factory/Factory'

const pages = [
  { pathname: '/', title: false, component: Home },
  { pathname: '/factory/:id', title: false, component: Factory }
]

export default pages
