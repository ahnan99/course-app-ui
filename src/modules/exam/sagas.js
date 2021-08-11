import { takeLatest, all, call, put } from 'redux-saga/effects'
import { actions, types } from '../exam'
import axios from 'axios'

//watchers
function* examWatch() {
    yield takeLatest(types.GET_EXAM, getExamWorker)
}

function* realExamListWatch() {
    yield takeLatest(types.GET_REAL_EXAM_LIST, getRealExamListWorker)
}

function* examQuestionWatch() {
    yield takeLatest(types.GET_EXAM_QUESTION, getExamQuestionWorker)
}

function* postExamWatch() {
    yield takeLatest(types.POST_EXAM, postExamWorker)
}

function* postTimeWatch() {
    yield takeLatest(types.POST_TIME, postTimeWorker)
}

function* postSingleQuestionWatch() {
    yield takeLatest(types.POST_SINGLE_QUESION, postSingleQuestionWorker)
}

//endPoints
export function getExamEndpoint(data) {
    return axios.get('/students/getStudentExamInfo', {
        params: data
    })
}

export function getRealExamListEndpoint(data) {
    return axios.get('/students/getExamListByUsername', {
        params: data
    })
}

export function postExamEndpoint(data) {
    return axios.post('/students/submit_student_exam', data)
}

export function getExamQuestionEndpoint(data) {
    return axios.get('/students/getStudentQuestionList', {
        params: data
    })
}

export function postTimeEndpoint(data) {
    return axios.post('/students/update_student_exam_secondRest', data)
}

export function postSingleQuestionEndpoint(data) {
    return axios.post('/students/update_student_question_answer', data)
}

//workers
function* getExamWorker(action) {
    try {
        const response = yield call(getExamEndpoint, action.payload)
        yield put(actions.updateExam(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* getRealExamListWorker(action) {
    try {
        const response = yield call(getRealExamListEndpoint, action.payload)
        yield put(actions.updateRealExamList(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* getExamQuestionWorker(action) {
    try {
        const response = yield call(getExamQuestionEndpoint, action.payload)
        yield put(actions.updateExamQuestion(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* postExamWorker(action) {
    try {
        const response = yield call(postExamEndpoint, action.payload)
        yield put(actions.updatePostExam(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* postTimeWorker(action) {
    try {
        const response = yield call(postTimeEndpoint, action.payload)
        yield put(actions.updatePostTime(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* postSingleQuestionWorker(action) {
    try {
        const response = yield call(postSingleQuestionEndpoint, action.payload)
        yield put(actions.updatePostSingleQuestion(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

export const workers = {
    getExamQuestionWorker,
    getExamWorker,
    postExamWorker,
    postTimeWorker,
    postSingleQuestionWorker,
    getRealExamListWorker
}

export default function* saga() {
    yield all([
        examWatch(),
        postExamWatch(),
        postTimeWatch(),
        examQuestionWatch(),
        postSingleQuestionWatch(),
        realExamListWatch()
    ])
}