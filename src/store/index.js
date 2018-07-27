import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware as createRouterMiddleware, connectRouter } from 'connected-react-router'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './reducers'
import rootEpic from './epics'

export default function configureStore (history, preloadState) {
  const routerMiddleware = createRouterMiddleware(history)
  const epicMiddleware = createEpicMiddleware()

  const middlewares = [routerMiddleware, epicMiddleware]
  const enhancers = []

  if (process.env.NODE_ENV === 'development' && !window.__REDUX_DEVTOOLS_EXTENSION__) {
    console.warn('Install Redux DevTools Extension to inspect the app state: ' +
      'https://github.com/zalmoxisus/redux-devtools-extension#installation')
  }

  const composeEnhancers = (process.env.NODE_ENV === 'development')
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

  const store = createStore(
    connectRouter(history)(rootReducer),
    preloadState,
    composeEnhancers(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )

  epicMiddleware.run(rootEpic)

  return store
}
