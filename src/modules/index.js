import {combineReducers} from 'redux'
import applicationReducer from './application'

const rootReducer = combineReducers({
    application: applicationReducer
})

export default rootReducer