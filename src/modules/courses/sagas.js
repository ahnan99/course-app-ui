import { takeLatest, select, call, put } from 'redux-saga/effects'
import { actions, types } from '../courses'
import demoCourses from '../../api/demodata/courses.json'

//watchers
function* courseWatch() {
    yield takeLatest(types.GET_COURSELIST, loadCourseWorker)
}

export function fetchFromApi() {
    return demoCourses
}

//workers
function* loadCourseWorker() {
    try {
        const data = yield call(fetchFromApi)
        yield put(actions.updateCourseList(data))
    } catch (error) {
        yield console.log(error)
    }
}

export const workers = {
    loadCourseWorker
}

export default function* saga(){
    yield courseWatch()
}