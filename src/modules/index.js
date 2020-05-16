import {combineReducers} from 'redux'
import applicationReducer from './application'
import userReducer from './user'
import courseReducer from './courses'
import certReducer from './certificate'
import messageReducer from './message'

const rootReducer = combineReducers({
    application: applicationReducer,
    user: userReducer,
    course: courseReducer,
    cert: certReducer,
    message: messageReducer
})

export default rootReducer