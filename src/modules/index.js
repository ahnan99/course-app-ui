import {combineReducers} from 'redux'
import applicationReducer from './application'
import loginPageReducer from './loginpage'

const rootReducer = combineReducers({
    application: applicationReducer,
    loginPage: loginPageReducer
})

export default rootReducer