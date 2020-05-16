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

export const workers = {
    getMessageTypeWorker,
    postMessageWorker,
    getMessageWorker,
    getSingleMessageWorker
}

export default function* saga() {
    yield all([messageTypeWatch(),postMessageWatch(),messageWatch(),singleMessageWatch()])
}