import { takeLatest, call, put, all } from 'redux-saga/effects'
import { actions, types } from './index'
import axios from 'axios'

//watchers
function* loginWatch() {
    yield takeLatest(types.REQUEST_LOGIN, userLoginWorker)
}

function* confirmLoginWatch() {
    yield takeLatest(types.CONFIRM_LOGIN, confirmLoginWorker)
}

function* registerWatch() {
    yield takeLatest(types.REQUEST_REGISTER, userRegisterWorker)
}

function* evalutionWatch() {
    yield takeLatest(types.POST_EVALUTION, postEvalutionWorker)
}

function* getUserInfoWatch() {
    yield takeLatest(types.GET_USER_INFO, getUserInfoWorker)
}

function* postUserInfoWatch() {
    yield takeLatest(types.POST_USER_INFO, postUserInfoWorker)
}

function* logoutWatch() {
    yield takeLatest(types.REQUEST_LOGOUT, userLogoutWorker)
}

function* companyInfoWatch() {
    yield takeLatest(types.GET_COMPANY_INFO, getCompanyInfoWorker)
}

function* auditorLoginWatch() {
    yield takeLatest(types.AUDITOR_REQUEST_LOGIN, auditorLoginWorker)
}

export function userLoginEndpoint(data) {
    return axios.post('/students/login', data)
}

export function userRegisterEndpoint(data) {
    return axios.post('/students/new_student', data)
}

export function postEvalutionEndpoint(data) {
    return axios.post('/public/postCommInfo', data)
}

export function confirmLoginEndpoint() {
    return axios.post('/knock_door')
}

export function getUserInfoEndpoint(data) {
    return axios.get('/students/get_student', {
        params: data
    })
}

export function postUserInfoEndpoint(data) {
    return axios.post('/students/update_student', data)
}

export function userLogoutEndpoint() {
    return axios.get('/students/logout')
}

export function getCompanyInfoEndpoint() {
    return axios.get('/public/getCompanyByHost')
}

export function auditorLoginEndpoint(data) {
    return axios.post('/users/login', data)
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

function* confirmLoginWorker(action) {
    try {
        const response = yield call(confirmLoginEndpoint)
        yield put(actions.updateConfirmLogin(response.data))
    } catch (error) {
        yield console.log(error)
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

function* postEvalutionWorker(action) {
    try {
        const response = yield call(postEvalutionEndpoint, action.payload)
        yield put(actions.postEvalution(response.data))
    } catch (error) {
        yield put(actions.postEvalutionError(error))
    }
}

function* getUserInfoWorker(action) {
    try {
        const response = yield call(getUserInfoEndpoint, action.payload)
        yield put(actions.updateUserInfo(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getCompanyInfoWorker(action) {
    try {
        const response = yield call(getCompanyInfoEndpoint, action.payload)
        yield put(actions.updateCompanyInfo(response.data))
    } catch (error) {
        console.log(error)
    }
}


function* postUserInfoWorker(action) {
    try {
        const response = yield call(postUserInfoEndpoint, action.payload)
        yield put(actions.updatePostUserInfo(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* userLogoutWorker() {
    try {
        const response = yield call(userLogoutEndpoint)
        yield put(actions.userLogout(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* auditorLoginWorker(action) {
    try {
        const response = yield call(auditorLoginEndpoint, action.payload)
        yield put(actions.auditorLogin(response.data))
    } catch (error) {
        yield put(actions.auditorLoginError(error))
    }
}

export const workers = {
    userLoginWorker,
    userRegisterWorker,
    postEvalutionWorker,
    getUserInfoWorker,
    postUserInfoWorker,
    userLogoutWorker,
    confirmLoginWorker,
    auditorLoginWorker
}

export default function* saga() {
    yield all([
        loginWatch(),
        confirmLoginWatch(),
        registerWatch(),
        evalutionWatch(),
        getUserInfoWatch(),
        postUserInfoWatch(),
        logoutWatch(),
        companyInfoWatch(),
        auditorLoginWatch()
    ])
}