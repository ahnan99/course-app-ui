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


export function getDeptEndpoint(data) {
    return axios.post('/public/get_deptListByPID', data)
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

export const workers = {
    getDept1Worker,
    getDept2Worker
}

export default function* saga() {
    yield all([getDept1Watch(),getDept2Watch()])
}