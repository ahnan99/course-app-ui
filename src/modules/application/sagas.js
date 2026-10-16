import { takeLatest, call, put, all, select } from 'redux-saga/effects'
import { actions, types } from './index'
import axios from 'axios'

//watchers
function* loginWatch() {
    // A new authentication operation cancels any older authentication task.
    yield takeLatest([
        types.REQUEST_LOGIN, types.AUDITOR_REQUEST_LOGIN,
        types.CONFIRM_LOGIN, types.REQUEST_LOGOUT
    ], authenticationWorker)
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

function* companyInfoWatch() {
    yield takeLatest(types.GET_COMPANY_INFO, getCompanyInfoWorker)
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
    return axios.post('/public/knock_door')
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
function* authenticationWorker(action) {
    switch (action.type) {
        case types.REQUEST_LOGIN:
            yield call(userLoginWorker, action)
            break
        case types.AUDITOR_REQUEST_LOGIN:
            yield call(auditorLoginWorker, action)
            break
        case types.CONFIRM_LOGIN:
            yield call(confirmLoginWorker, action)
            break
        case types.REQUEST_LOGOUT:
            yield call(userLogoutWorker, action)
            break
        default:
            break
    }
}

const sessionFailure = { msg: '登录状态未能保持，请重试；若持续出现，请尝试其他浏览器' }

// Password acceptance alone is insufficient: verify the browser's session cookie
// and load the student profile before publishing a single login-success action.
function* verifySession(loginData, auditor) {
    const session = yield call(confirmLoginEndpoint)
    if (!session.data || !session.data.username ||
        (loginData.username && session.data.username !== loginData.username)) {
        throw new Error('Invalid session')
    }
    const data = { ...loginData, ...session.data }
    if (!auditor || data.auditor !== 1) {
        const profile = yield call(getUserInfoEndpoint, { username: data.username })
        if (!Array.isArray(profile.data) || !profile.data[0] ||
            !profile.data[0].username || profile.data[0].username !== data.username) {
            throw new Error('Invalid student profile')
        }
        data.userInfo = profile.data[0]
    }
    return data
}

function* userLoginWorker(action) {
    const authEpoch = yield select(state => state.application.authEpoch)
    try {
        const response = yield call(userLoginEndpoint, action.payload)
        if (!response.data || response.data.status !== 0) {
            yield put(actions.userLogin(response.data || sessionFailure, authEpoch))
            return
        }
        const data = yield call(verifySession, {
            ...response.data, username: response.data.username || action.payload.username
        }, false)
        yield put(actions.userLogin({ ...data, status: 0 }, authEpoch))
    } catch (error) {
        yield put(actions.userLoginError(sessionFailure, authEpoch))
    }
}

function* confirmLoginWorker(action) {
    const authEpoch = yield select(state => state.application.authEpoch)
    try {
        const data = yield call(verifySession, {}, true)
        yield put(actions.updateConfirmLogin(data, authEpoch))
    } catch (error) {
        yield put(actions.updateConfirmLogin({ username: '' }, authEpoch))
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
    const authEpoch = yield select(state => state.application.authEpoch)
    try {
        const response = yield call(getUserInfoEndpoint, action.payload)
        yield put(actions.updateUserInfo(response.data, authEpoch))
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
    const authEpoch = yield select(state => state.application.authEpoch)
    try {
        const response = yield call(userLogoutEndpoint)
        yield put(actions.userLogout(response.data, authEpoch))
    } catch (error) {
        yield put(actions.userLogout({ status: -1 }, authEpoch))
        console.log(error)
    }
}

function* auditorLoginWorker(action) {
    const authEpoch = yield select(state => state.application.authEpoch)
    try {
        const response = yield call(auditorLoginEndpoint, action.payload)
        if (!response.data || response.data.status !== 0) {
            yield put(actions.auditorLogin(response.data || sessionFailure, authEpoch))
            return
        }
        const data = yield call(verifySession, {
            ...response.data, username: response.data.username || action.payload.username
        }, true)
        yield put(actions.auditorLogin({ ...data, status: 0 }, authEpoch))
    } catch (error) {
        yield put(actions.auditorLoginError(sessionFailure, authEpoch))
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
        registerWatch(),
        evalutionWatch(),
        getUserInfoWatch(),
        postUserInfoWatch(),
        companyInfoWatch()
    ])
}
