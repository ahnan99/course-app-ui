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

export const workers = {
    loadCourseWorker,
    loadLessonWorker
}

export default function* saga() {
    yield all([courseWatch(),lessonWatch()])
}