import { all, fork } from 'redux-saga/effects'

import courseSaga from './courses/sagas'
import applicationSaga from './application/sagas'

const sagas = [
    courseSaga,
    applicationSaga
]

function* rootSaga(){
    yield all(sagas.map(saga => fork(saga)))
}

export default rootSaga;