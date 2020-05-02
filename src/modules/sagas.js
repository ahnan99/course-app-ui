import { all, fork } from 'redux-saga/effects'

import courseSaga from './courses/sagas'

const sagas = [
    courseSaga
]

function* rootSaga(){
    yield all(sagas.map(saga => fork(saga)))
}

export default rootSaga;