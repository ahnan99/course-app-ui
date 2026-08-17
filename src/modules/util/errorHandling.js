import { put, select } from 'redux-saga/effects'
import { actions } from '../application'

function* handleAuthenticationErrors(error) {
    // 网络中断等情况下 error.response 可能为 undefined，避免在此抛错
    if (!error || !error.response) {
        return;
    }
    const errorCode = error.response.status;
    const loggedIn = yield select(state => state.application.loggedIn);
    if (loggedIn === true && (errorCode === 401 || errorCode === 501)) {
        yield put(actions.updateLoginStatus(errorCode));
    }
}
export  { handleAuthenticationErrors };
