import {combineReducers} from 'redux'
import applicationReducer from './application'
import userReducer from './user'
import courseReducer from './courses'
import certReducer from './certificate'

const rootReducer = combineReducers({
    application: applicationReducer,
    user: userReducer,
    course: courseReducer,
    cert: certReducer
})

export default rootReducer