import { takeLatest, call, put, all } from 'redux-saga/effects'
import { actions, types } from './index'
import axios from 'axios'

//watchers
function* getSelectedCertWatch() {
    yield takeLatest(types.GET_SELECTED_CERT, getSelectedCertWorker)
}

function* getCertCourseWatch() {
    yield takeLatest(types.GET_CERT_COURSE, getCertCourseWorker)
}

function* getRestCertWatch() {
    yield takeLatest(types.GET_REST_CERT, getRestCertWorker)
}

function* getAccomplishedWatch() {
    yield takeLatest(types.GET_ACCOMPLISHED, getAccomplishedWorker)
}

function* postDelCertWatch() {
    yield takeLatest(types.POST_DEL_CERT, postDelCertWorker)
}

function* postAddCertWatch() {
    yield takeLatest(types.POST_ADD_CERT, postAddCertWorker)
}


export function getSelectedCertEndpoint(data) {
    return axios.get('/students/getStudentCertPickList', {
        params: data
    })
}

export function getCertCourseEndpoint(data) {
    return axios.get('/students/getStudentCertCourseList', {
        params: data
    })
}

export function getRestCertEndpoint(data) {
    return axios.get('/students/getStudentCertRestList', {
        params: data
    })
}

export function postDelCertEndpoint(data) {
    return axios.post('/students/remove_student_certificate', data)
}

export function postAddCertEndpoint(data) {
    return axios.post('/students/add_student_certificate', data)
}

export function getAccomplishedEndpoint(data) {
    return axios.get('/students/get_student_diploma_list', {
        params: data
    })
}


//workers
function* getSelectedCertWorker(action) {
    try {
        const response = yield call(getSelectedCertEndpoint, action.payload)
        yield put(actions.updateSelectedCert(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getCertCourseWorker(action) {
    try {
        const response = yield call(getCertCourseEndpoint, action.payload)
        yield put(actions.updateCertCourse(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getRestCertWorker(action) {
    try {
        const response = yield call(getRestCertEndpoint, action.payload)
        yield put(actions.updateRestCert(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postDelCertWorker(action) {
    try {
        const response = yield call(postDelCertEndpoint, action.payload)
        yield put(actions.updateDelCert(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postAddCertWorker(action) {
    try {
        const response = yield call(postAddCertEndpoint, action.payload)
        yield put(actions.updateAddCert(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getAccomplishedWorker(action) {
    try {
        const response = yield call(getAccomplishedEndpoint, action.payload)
        yield all([put(actions.updateEmptyAccomplished(response.data.length === 0)), put(actions.updateAccomplished(response.data))])
    } catch (error) {
        console.log(error)
    }
}

export const workers = {
    getCertCourseWorker,
    getRestCertWorker,
    getSelectedCertWorker,
    postDelCertWorker,
    postAddCertWorker,
    getAccomplishedWorker
}

export default function* saga() {
    yield all([getAccomplishedWatch(), getCertCourseWatch(), getRestCertWatch(), getSelectedCertWatch(), postAddCertWatch(), postDelCertWatch()])
}