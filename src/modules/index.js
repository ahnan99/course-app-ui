import {combineReducers} from 'redux'
import applicationReducer from './application'
import userReducer from './user'
import courseReducer from './courses'

const rootReducer = combineReducers({
    application: applicationReducer,
    user: userReducer,
    course: courseReducer
})

export default rootReducer