import Home from './home/Home'
import Factory from './factory/Factory'

const pages = [
  { pathname: '/', title: 'Docomo Poinko Textmaker', component: Home },
  { pathname: '/factory/:id', title: 'Docomo Poinko Textmaker', component: Factory }
]

export default pages
