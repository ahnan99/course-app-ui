import {combineReducers} from 'redux'
import applicationReducer from './application'
import userReducer from './user'
import courseReducer from './courses'
import certReducer from './certificate'
import messageReducer from './message'
import examReducer from './exam'
import auditReducer from './audit'

const rootReducer = combineReducers({
    application: applicationReducer,
    user: userReducer,
    course: courseReducer,
    cert: certReducer,
    message: messageReducer,
    exam: examReducer,
    audit: auditReducer
})

export default rootReducer