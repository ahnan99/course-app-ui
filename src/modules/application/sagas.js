import { takeLatest, call, put } from 'redux-saga/effects'
import { actions, types } from './index'
import axios from 'axios'

//watchers
function* loginWatch() {
    yield takeLatest(types.REQUEST_LOGIN, userLoginWorker)
}

export function userLoginEndpoint(data) {
    return axios.post('/student/login', data)
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

//workers
function* userLoginWorker(action) {
    try {
        const response = yield call(userLoginEndpoint, action.payload)
        yield put(actions.userLogin(response))
    } catch (error) {
        yield console.log(error)
    }
}

export const workers = {
    userLoginWorker
}

export default function* saga() {
    yield loginWatch()
}