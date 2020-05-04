import { takeLatest, call, put, all } from 'redux-saga/effects'
import { actions, types } from './index'
import axios from 'axios'

//watchers
function* loginWatch() {
    yield takeLatest(types.REQUEST_LOGIN, userLoginWorker)
}

function* registerWatch() {
    yield takeLatest(types.REQUEST_REGISTER, userRegisterWorker)
}

export function userLoginEndpoint(data) {
    return axios.post('/students/login', data)
}

export function userRegisterEndpoint(data){
    return axios.post('/students/new_student', data)
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

function* userRegisterWorker(action) {
    try {
        const response = yield call(userRegisterEndpoint, action.payload)
        yield put(actions.userRegister(response.data))
    } catch (error) {
        yield put(actions.userRegisterError(error))
    }
}

export const workers = {
    userLoginWorker,
    userRegisterWorker
}

export default function* saga() {
    yield all([loginWatch(),registerWatch()])
}