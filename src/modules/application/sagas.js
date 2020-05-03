import { takeLatest, call, put } from 'redux-saga/effects'
import { actions, types } from './index'
import axios from 'axios'

//watchers
function* loginWatch() {
    yield takeLatest(types.REQUEST_LOGIN, userLoginWorker)
}

export function userLoginEndpoint(data) {
    return axios.post('/students/login', data)
}

//workers
function* userLoginWorker(action) {
    try {
        const response = yield call(userLoginEndpoint, action.payload)
        yield put(actions.userLogin(response.data))
    } catch (error) {
        yield put(actions.userLoginError(error))
    }
}

export const workers = {
    userLoginWorker
}

export default function* saga() {
    yield loginWatch()
}