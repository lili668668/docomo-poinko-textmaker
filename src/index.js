import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory } from 'history'
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './app'
import registerServiceWorker from './registerServiceWorker'

const history = createHashHistory()
const store = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
