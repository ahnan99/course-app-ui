import { takeLatest, all, call, put } from 'redux-saga/effects'
import { actions, types } from '../courses'
import axios from 'axios'

//watchers
function* courseWatch() {
    yield takeLatest(types.GET_COURSELIST, loadCourseWorker)
}

function* lessonWatch() {
    yield takeLatest(types.GET_LESSONLIST, loadLessonWorker)
}

function* videoWatch() {
    yield takeLatest(types.GET_VIDEO, loadVideoWorker)
}

function* pdfWatch() {
    yield takeLatest(types.GET_PDF, loadPDFWorker)
}

function* maxTimeWatch() {
    yield takeLatest(types.POST_MAX_TIME, updateMaxTimeWorker)
}

function* maxPageWatch() {
    yield takeLatest(types.POST_MAX_PAGE, updateMaxPageWorker)
}

function* signatureWatch() {
    yield takeLatest(types.POST_SIGNATURE, updateSignatureWorker)
}

export function getCourseList(data) {
    return axios.get('/students/getStudentCourseList', {
        params: data
    })
}

export function getLessonList(data) {
    return axios.get('/students/getStudentLessonListByUser', {
        params: data
    })
}

export function getVideo(data) {
    return axios.get('/students/getStudentVideo', {
        params: data
    })
}

export function getPDF(data) {
    return axios.get('/students/getStudentCourseware', {
        params: data
    })
}

export function postMaxTime(data) {
    return axios.post('/students/update_video_currentTime', data)
}

export function postMaxPage(data) {
    return axios.post('/students/update_courseware_currentPage', data)
}

export function postSignature(data) {
    return axios.post('/files/uploadBase64img', data)
}

//workers
function* loadCourseWorker(action) {
    try {
        const response = yield call(getCourseList, action.payload)
        yield put(actions.updateCourseList(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* loadLessonWorker(action) {
    try {
        const response = yield call(getLessonList, action.payload)
        yield put(actions.updateLessonList(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* loadVideoWorker(action) {
    try {
        const response = yield call(getVideo, action.payload)
        yield put(actions.updateVideo(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* loadPDFWorker(action) {
    try {
        const response = yield call(getPDF, action.payload)
        yield put(actions.updatePDF(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* updateMaxTimeWorker(action) {
    try {
        const response = yield call(postMaxTime, action.payload)
        yield put(actions.updateMaxTime(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* updateMaxPageWorker(action) {
    try {
        const response = yield call(postMaxPage, action.payload)
        yield put(actions.updateMaxPage(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* updateSignatureWorker(action) {
    try {
        const response = yield call(postSignature, action.payload)
        yield put(actions.updateSignature(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

export const workers = {
    loadCourseWorker,
    loadLessonWorker,
    loadVideoWorker,
    loadPDFWorker,
    updateMaxTimeWorker,
    updateMaxPageWorker,
    updateSignatureWorker
}

export default function* saga() {
    yield all([courseWatch(),lessonWatch(),pdfWatch(),videoWatch(),maxTimeWatch(),maxPageWatch(),signatureWatch()])
}