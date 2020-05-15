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

//endPoints
export function getMessageTypeEndpoint(data) {
    return axios.get('/students/getDictionaryList', {
        params: data
    })
}

export function postMessageEndpoint(data) {
    return axios.post('/students/submit_student_feedback', data)
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

export const workers = {
    getMessageTypeWorker,
    postMessageWorker
}

export default function* saga() {
    yield all([messageTypeWatch(),postMessageWatch()])
}