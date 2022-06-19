import { takeLatest, all, call, put } from 'redux-saga/effects'
import { actions, types } from '../message'
import axios from 'axios'

//watchers
function* messageTypeWatch() {
    yield takeLatest(types.GET_MESSAGE_TYPE, getMessageTypeWorker)
}

function* postMessageWatch() {
    yield takeLatest(types.POST_MESSAGE, postMessageWorker)
}

function* messageWatch() {
    yield takeLatest(types.GET_MESSAGE, getMessageWorker)
}

function* singleMessageWatch() {
    yield takeLatest(types.GET_SINGLE_MESSAGE, getSingleMessageWorker)
}

function* getClassCommentWatch() {
    yield takeLatest(types.GET_CLASS_COMMENT, getClassCommentWorker)
}


function* postClassCommentWatch() {
    yield takeLatest(types.POST_CLASS_COMMENT, postClassCommentWorker)
}


function* deleteClassCommentWatch() {
    yield takeLatest(types.DELETE_CLASS_COMMENT, deleteClassCommentWorker)
}




//endPoints
export function getMessageTypeEndpoint(data) {
    return axios.get('/students/getDictionaryList', {
        params: data
    })
}

export function postMessageEndpoint(data) {
    return axios.post('/students/submit_student_feedback', data)
}

export function getMessageEndpoint(data) {
    return axios.get('/students/get_student_message_List', {
        params: data
    })
}

export function getSingleMessageEndpoint(data) {
    return axios.get('/students/get_student_message_info', {
        params: data
    })
}

export function getClassCommentEndpoint(data) {
    return axios.get('/public/get_feedback_class_list', {
        params: data
    })
}

export function postClassCommentEndpoint(data) {
    return axios.post('/public/submit_feedback_class', data)
}

export function deleteClassCommentEndpoint(data) {
    return axios.post('/public/cancel_feedback_class', data)
}

//workers
function* getMessageTypeWorker(action) {
    try {
        const response = yield call(getMessageTypeEndpoint, action.payload)
        yield put(actions.updateMessageType(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* postMessageWorker(action) {
    try {
        const response = yield call(postMessageEndpoint, action.payload)
        yield put(actions.updatePostMessage(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* getMessageWorker(action) {
    try {
        const response = yield call(getMessageEndpoint, action.payload)
        yield put(actions.updateMessage(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* getSingleMessageWorker(action) {
    try {
        const response = yield call(getSingleMessageEndpoint, action.payload)
        yield put(actions.updateSingleMessage(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* getClassCommentWorker(action) {
    try {
        const response = yield call(getClassCommentEndpoint, action.payload)
        yield put(actions.updateClassComment(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

function* postClassCommentWorker(action) {
    try {
        const response = yield call(postClassCommentEndpoint, action.payload)
        yield put(actions.updatePostClassComment(response.data))
    } catch (error) {
        yield console.log(error)
    }
}


function* deleteClassCommentWorker(action) {
    try {
        const response = yield call(deleteClassCommentEndpoint, action.payload)
        yield put(actions.updateDeleteClassComment(response.data))
    } catch (error) {
        yield console.log(error)
    }
}

export const workers = {
    getMessageTypeWorker,
    postMessageWorker,
    getMessageWorker,
    getSingleMessageWorker,
    getClassCommentWorker,
    postClassCommentWorker,
    deleteClassCommentWatch
}

export default function* saga() {
    yield all([messageTypeWatch(), postMessageWatch(), messageWatch(), singleMessageWatch(), getClassCommentWatch(), postClassCommentWatch(), deleteClassCommentWatch()])
}