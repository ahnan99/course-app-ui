import { all, fork } from 'redux-saga/effects'

import courseSaga from './courses/sagas'
import applicationSaga from './application/sagas'
import userSaga from './user/sagas'
import certSaga from './certificate/sagas'
import messageSaga from './message/sagas'

const sagas = [
    courseSaga,
    applicationSaga,
    userSaga,
    certSaga,
    messageSaga
]

function* rootSaga(){
    yield all(sagas.map(saga => fork(saga)))
}

export default rootSaga;