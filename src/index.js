import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory } from 'history'
import App from './app'
import registerServiceWorker from './registerServiceWorker'

const history = createHashHistory()

ReactDOM.render(
  <App history={history} />
  ,document.getElementById('root')
)

registerServiceWorker();
