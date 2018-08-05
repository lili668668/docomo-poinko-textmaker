import Home from './home/Home'
import Factory from './factory/Factory'
import Info from './info/Info'

const pages = [
  { pathname: '/', title: 'Docomo Poinko Text Maker', component: Home, lastPage: false },
  { pathname: '/factory/:id', title: 'Docomo Poinko Text Maker', component: Factory, lastPage: '/' },
  { pathname: '/info', title: 'Docomo Poinko Text Maker', component: Info, lastPage: '/' }
]

export default pages
