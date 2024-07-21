import { takeLatest, call, put, all } from 'redux-saga/effects'
import { actions, types } from './index'
import { handleAuthenticationErrors } from '../util/errorHandling'
import axios from 'axios'

//watchers

function* getCertListWatcher() {
    yield takeLatest(types.GET_CERT_LIST, getCertListWorker)
}

function* findStudentWatcher() {
    yield takeLatest(types.GET_FIND_STUDENT, findStudentWorker)
}

export function getFindStudentEndpoint(data) {
    return axios.get('/students/find_student', {
        params: data
    })
}

export function getCertListEndpoint(data) {
    return axios.get('/students/get_cert_list', {
        params: data
    })
}

function* getCertListWorker(action) {
    try {
        const response = yield call(getCertListEndpoint, action.payload)
        yield put(actions.updateCertList(response.data))
    } catch (error) {
        yield handleAuthenticationErrors(error);
    }
}

function* findStudentWorker(action) {
    try {
        const response = yield call(getFindStudentEndpoint, action.payload)
        yield put(actions.updateFindStudent(response.data))
    } catch (error) {
        yield handleAuthenticationErrors(error);
    }
}

export const workers = {
    getCertListWorker,
    findStudentWorker
}

export default function* saga() {
    yield all([
        getCertListWatcher(),
        findStudentWatcher()
    ])
}