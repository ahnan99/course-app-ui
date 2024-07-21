import { takeLatest, call, put, all } from 'redux-saga/effects'
import { actions, types } from './index'
import axios from 'axios'

//watchers
function* getDept1Watch() {
    yield takeLatest(types.GET_DEPT_1, getDept1Worker)
}

function* getDept2Watch() {
    yield takeLatest(types.GET_DEPT_2, getDept2Worker)
}

function* postResetPasswordWatch() {
    yield takeLatest(types.POST_RESET_PASSWORD, postResetPasswordWorker)
}

function* getEducationWatch() {
    yield takeLatest(types.GET_EDUCATION, getEducationWorker)
}

function* getInvoiceWatch() {
    yield takeLatest(types.GET_INVOICE, getInvoiceWorker)
}

function* postFaceDetectOSSWatch() {
    yield takeLatest(types.POST_FACE_DETECT_OSS, postFaceDetectOSSWorker)
}

export function getDeptEndpoint(data) {
    console.log(data)
    return axios.get('/public/getDeptListByPID', {
        params: data
    })
}

export function postResetPasswordEndpoint(data) {
    return axios.post('/public/reset_student_password', data)
}

export function getEducationEndpoint(data) {
    console.log(data)
    return axios.get('/public/getDicListByKind', {
        params: data
    })
}

export function getInvoiceEndpoint(data) {
    return axios.get('/public/getInvoiceList', {
        params: data
    })
}

export function postFaceDetectOSSEndpoint(data) {
    return axios.post('/alis/uploadFaceDetectOSS', data)
}

//workers
function* getDept1Worker(action) {
    try {
        const response = yield call(getDeptEndpoint, action.payload)
        yield put(actions.updateDept1(response.data))
    } catch (error) {
        yield put(actions.dept1Error(error))
    }
}

function* getDept2Worker(action) {
    try {
        const response = yield call(getDeptEndpoint, action.payload)
        yield put(actions.updateDept2(response.data))
    } catch (error) {
        yield put(actions.dept2Error(error))
    }
}

function* postResetPasswordWorker(action) {
    try {
        const response = yield call(postResetPasswordEndpoint, action.payload)
        yield put(actions.updateResetPassword(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* getEducationWorker(action) {
    try {
        const response = yield call(getEducationEndpoint, action.payload)
        yield put(actions.updateEducation(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* getInvoiceWorker(action) {
    try {
        const response = yield call(getInvoiceEndpoint, action.payload)
        yield put(actions.updateInvoice(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* postFaceDetectOSSWorker(action) {
    try {
        const response = yield call(postFaceDetectOSSEndpoint, action.payload)
        yield put(actions.updateFaceDetectOSS(response.data))
    } catch (error) {
        // yield console.log(error)
        yield put(actions.updateFaceDetectOSS(error))
    }
}

export const workers = {
    getDept1Worker,
    getDept2Worker,
    postResetPasswordWorker,
    getEducationWorker,
    getInvoiceWorker,
    postFaceDetectOSSWorker
}

export default function* saga() {
    yield all([getDept1Watch(), getDept2Watch(), postResetPasswordWatch(), getEducationWatch(), getInvoiceWatch(), postFaceDetectOSSWatch()])
}