import Home from './home/Home'
import Factory from './factory/Factory'

const pages = [
  { pathname: '/', title: 'Docomo Poinko Text Maker', component: Home },
  { pathname: '/factory/:id', title: 'Docomo Poinko Text Maker', component: Factory }
]

export default pages
