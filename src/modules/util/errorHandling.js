import { put } from 'redux-saga/effects'
import { actions } from '../application'

function* handleAuthenticationErrors(error) {
    const errorCode = error.response.status;
    if (errorCode === 401 || errorCode === 501) {
        yield put(actions.updateLoginStatus(errorCode));
    }
}
export  { handleAuthenticationErrors };