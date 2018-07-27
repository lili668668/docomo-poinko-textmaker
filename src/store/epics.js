import 'rxjs'
import { combineEpics } from 'redux-observable'
import { ajax } from 'rxjs/observable/dom/ajax'

const rootEpic = (...args) => combineEpics(

)(...args, { ajax })

export default rootEpic
