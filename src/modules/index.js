import {combineReducers} from 'redux'
import applicationReducer from './application'
import loginPageReducer from './loginpage'
import courseReducer from './courses'

const rootReducer = combineReducers({
    application: applicationReducer,
    loginPage: loginPageReducer,
    course: courseReducer
})

export default rootReducer