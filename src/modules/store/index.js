import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSagas from '../sagas'
import rootReducer from '../'
import axios from 'axios'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
const store = createStore(rootReducer, enhancer)
// Axios copies defaults into each request config when the request is created.
// Keep this local metadata (not an HTTP header) to identify delayed auth errors.
const syncAuthEpoch = () => {
    axios.defaults.courseAppAuthEpoch = store.getState().application.authEpoch
}
syncAuthEpoch()
store.subscribe(syncAuthEpoch)
sagaMiddleware.run(rootSagas);

export default store
