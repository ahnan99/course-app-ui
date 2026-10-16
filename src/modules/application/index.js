//Actions
const REQUEST_LOGIN = 'request_login'
const USER_LOGIN = 'user_login'
const USER_LOGIN_ERROR = 'request_login_error'
const REQUEST_REGISTER = 'request_register'//submit form
const POST_EVALUTION = 'post_evalution'//submit form
const USER_REGISTER = 'user_register' //receive repsonse
const USER_REGISTER_ERROR = 'request_register_error'//receive error
const POST_EVALUTION_ERROR = 'post_evalution_error'//receive error
const RESET_REGISTER_STATUS = 'reset_register_status'
const GET_USER_INFO = 'get_user_info'
const UPDATE_USER_INFO = 'update_user_info'
const POST_USER_INFO = 'post_user_info'
const UPDATE_POST_USER_INFO = 'update_post_user_info'
const RESET_POST_USER_INFO = 'reset_post_user_info'
const UPDATE_LOGIN_STATUS = 'update_login_status'
const REQUEST_LOGOUT = 'request_logout'
const USER_LOGOUT = 'user_logout'
const GET_COMPANY_INFO = 'get_company_info'
const UPDATE_COMPANY_INFO = 'update_company_info'
const UPDATE_NEW_COURSE = 'update_new_course'
const CONFIRM_LOGIN = 'confirm_login'
const UPDATE_CONFIRM_LOGIN = 'update_confirm_login'
const AUDITOR_LOGIN = 'auditor_login'
const AUDITOR_LOGIN_ERROR = 'auditor_login_error'
const UPDATE_AUDITOR = 'update_auditor'
const AUDITOR_REQUEST_LOGIN = 'auditor_request_login'
const UPDATE_FROM_ID = 'update_from_id'
const UPDATE_LOGURL = 'update_logurl'

export const types = {
    REQUEST_LOGIN,
    USER_LOGIN,
    USER_LOGIN_ERROR,
    REQUEST_REGISTER,
    POST_EVALUTION,
    USER_REGISTER,
    USER_REGISTER_ERROR,
    POST_EVALUTION_ERROR,
    RESET_REGISTER_STATUS,
    GET_USER_INFO,
    UPDATE_USER_INFO,
    POST_USER_INFO,
    UPDATE_POST_USER_INFO,
    RESET_POST_USER_INFO,
    UPDATE_LOGIN_STATUS,
    USER_LOGOUT,
    REQUEST_LOGOUT,
    GET_COMPANY_INFO,
    UPDATE_COMPANY_INFO,
    UPDATE_NEW_COURSE,
    CONFIRM_LOGIN,
    UPDATE_CONFIRM_LOGIN,
    AUDITOR_LOGIN,
    AUDITOR_LOGIN_ERROR,
    UPDATE_AUDITOR,
    AUDITOR_REQUEST_LOGIN,
    UPDATE_FROM_ID,
    UPDATE_LOGURL
}

//Action creators
const requestLogin = payload => ({
    type: REQUEST_LOGIN,
    payload
})


const userLogin = (response, authEpoch) => ({
    type: USER_LOGIN,
    authEpoch,
    response
});

const auditorLogin = (response, authEpoch) => ({
    type: AUDITOR_LOGIN,
    authEpoch,
    response
});

const auditorLoginError = (response, authEpoch) => ({
    type: AUDITOR_LOGIN_ERROR,
    authEpoch,
    response
})

const userLoginError = (response, authEpoch) => ({
    type: USER_LOGIN_ERROR,
    authEpoch,
    response
})

const requestRegister = payload => ({
    type: REQUEST_REGISTER,
    payload
})

const postEvalution = payload => ({
    type: POST_EVALUTION,
    payload
})

const userRegister = response => ({
    type: USER_REGISTER,
    response
})

const userRegisterError = response => ({
    type: USER_REGISTER_ERROR,
    response
})

const postEvalutionError = response => ({
    type: POST_EVALUTION_ERROR,
    response
})

const resetRegisterStatus = () => ({
    type: RESET_REGISTER_STATUS
})

const getUserInfo = payload => ({
    type: GET_USER_INFO,
    payload
})

const updateUserInfo = (data, authEpoch) => ({
    type: UPDATE_USER_INFO,
    authEpoch,
    data
})

const postUserInfo = payload => ({
    type: POST_USER_INFO,
    payload
})

const updatePostUserInfo = data => ({
    type: UPDATE_POST_USER_INFO,
    data
})

const resetPostUserInfo = () => ({
    type: RESET_POST_USER_INFO
})

const updateLoginStatus = (data, authEpoch) => ({
    type: UPDATE_LOGIN_STATUS,
    authEpoch,
    data
})

const requestLogout = () => ({
    type: REQUEST_LOGOUT
})

const userLogout = (response, authEpoch) => ({
    type: USER_LOGOUT,
    authEpoch,
    response
})

const getCompanyInfo = payload => ({
    type: GET_COMPANY_INFO,
    payload
})

const updateCompanyInfo = data => ({
    type: UPDATE_COMPANY_INFO,
    data
})

const updateNewCourse = data => ({
    type: UPDATE_NEW_COURSE,
    data
})

const updateAuditor = data => ({
    type: UPDATE_AUDITOR,
    data
})

const confirmLogin = () => ({
    type: CONFIRM_LOGIN
})

const updateConfirmLogin = (response, authEpoch) => ({
    type: UPDATE_CONFIRM_LOGIN,
    authEpoch,
    response
})

const auditorRequestLogin = payload => ({
    type: AUDITOR_REQUEST_LOGIN,
    payload
})

const updateFromID = data => ({
    type: UPDATE_FROM_ID,
    data
})

const updateLogurl = data => ({
    type: UPDATE_LOGURL,
    data
})

export const actions = {
    userLogin,
    requestLogin,
    userLoginError,
    requestRegister,
    postEvalution,
    userRegister,
    userRegisterError,
    postEvalutionError,
    resetRegisterStatus,
    getUserInfo,
    postUserInfo,
    updateUserInfo,
    updatePostUserInfo,
    resetPostUserInfo,
    updateLoginStatus,
    requestLogout,
    userLogout,
    updateCompanyInfo,
    getCompanyInfo,
    updateNewCourse,
    confirmLogin,
    updateConfirmLogin,
    auditorLogin,
    auditorLoginError,
    updateAuditor,
    auditorRequestLogin,
    updateFromID,
    updateLogurl
}

const initialState = {
    authEpoch: 0,
    loggedIn: false,
    loginStatusCode: null,
    loginSource: null,
    username: null,
    isFetching: false,
    loginError: null,
    registered: false,
    registerError: null,
    userInfo: null,
    postUserInfoStatus: null,
    companyInfo: null,
    newCourse: null,
    auditor: null,
    fromID: null,
    teacher: null,
    logUrl: null
}
//Reducers
const reducer = (state = initialState, action = {}) => {
    // Responses from an older login/session must not change the current session.
    if (action.authEpoch !== undefined && action.authEpoch !== state.authEpoch) {
        return state
    }
    switch (action.type) {
        case REQUEST_LOGIN:
        case AUDITOR_REQUEST_LOGIN:
        case CONFIRM_LOGIN:
            return {
                ...state,
                authEpoch: state.authEpoch + 1,
                isFetching: true,
                loginError: null,
                userInfo: null
            }
        case REQUEST_LOGOUT:
            return { ...state, authEpoch: state.authEpoch + 1, isFetching: true }
        case USER_LOGIN_ERROR:
        case AUDITOR_LOGIN_ERROR:
            return {
                ...state,
                isFetching: false,
                loggedIn: false,
                loginSource: null,
                username: null,
                userInfo: null,
                loginError: action.response
            }
        case USER_LOGIN: {
            if (action.response.status === 0) {
                return {
                    ...state,
                    loggedIn: true,
                    isFetching: false,
                    loginStatusCode: null,
                    loginSource: 'credentials',
                    loginError: null,
                    username: action.response.username,
                    newCourse: action.response.newCourse,
                    userInfo: action.response.userInfo,
                    auditor: null,
                    teacher: null
                }
            } else if (action.response.sessionExpire === 1) {
                return {
                    ...state,
                    loggedIn: false,
                    isFetching: false,
                    loginError: { msg: '登录状态未能保持，请重新登录' }
                }
            } else {
                return {
                    ...state,
                    loggedIn: false,
                    isFetching: false,
                    loginError: action.response
                }
            }
        }
        case AUDITOR_LOGIN: {
            if (action.response.status === 0) {
                console.log('response',action.response )
                return {
                    ...state,
                    loggedIn: true,
                    isFetching: false,
                    loginStatusCode: null,
                    loginSource: 'credentials',
                    loginError: null,
                    username: action.response.username,
                    userInfo: action.response.userInfo || null,
                    teacher: action.response.teacher,
                    auditor: action.response.auditor
                }
            } else if (action.response.sessionExpire === 1) {
                return {
                    ...state,
                    loggedIn: false,
                    isFetching: false,
                    loginError: { msg: '登录状态未能保持，请重新登录' }
                }
            } else {
                return {
                    ...state,
                    loggedIn: false,
                    isFetching: false,
                    loginError: action.response
                }
            }
        }
        case USER_REGISTER: {
            if (action.response.status === 0) {
                return {
                    ...state,
                    registered: true,
                    registerError: null
                }
            } else {
                return {
                    ...state,
                    registerError: action.response.msg
                }
            }
        }
        case RESET_REGISTER_STATUS: {
            return {
                ...state,
                registered: false,
                registerError: null
            }
        }
        case UPDATE_USER_INFO: {
            if(action.data.username === ""){
                return {
                    ...state,
                    loggedIn: false,
                    loginError: "登录失败"
                }
            }
            return {
                ...state,
                userInfo: action.data[0]
            }
        }
        case UPDATE_POST_USER_INFO: {
            return {
                ...state,
                postUserInfoStatus: action.data
            }
        }
        case RESET_POST_USER_INFO: {
            return {
                ...state,
                postUserInfoStatus: null
            }
        }
        case UPDATE_LOGIN_STATUS: {
            const isAuthenticationError = action.data === 401 || action.data === 501
            return {
                ...state,
                authEpoch: isAuthenticationError ? state.authEpoch + 1 : state.authEpoch,
                loggedIn: isAuthenticationError ? false : action.data,
                isFetching: isAuthenticationError ? false : state.isFetching,
                loginStatusCode: isAuthenticationError ? action.data : null,
                loginSource: isAuthenticationError ? null : state.loginSource
            }
        }
        case UPDATE_COMPANY_INFO: {
            return {
                ...state,
                companyInfo: action.data
            }
        }
        case UPDATE_FROM_ID: {
            return {
                ...state,
                fromID: action.data
            }
        }
        case UPDATE_LOGURL: {
            return {
                ...state,
                logUrl: action.data
            }
        }
        case USER_LOGOUT: {
            if (action.response.status === 0) {
                return {
                    ...state,
                    loggedIn: false,
                    isFetching: false,
                    loginStatusCode: null,
                    loginSource: null,
                    loginError: null,
                    username: null,
                    userInfo: null,
                    auditor: null,
                    teacher: null
                }
            }
            return { ...state, isFetching: false }
        }
        case UPDATE_NEW_COURSE: {
            return {
                ...state,
                newCourse: action.data
            }
        }
        case UPDATE_AUDITOR: {
            return {
                ...state,
                auditor: action.data
            }
        }
        case UPDATE_CONFIRM_LOGIN: {
            if (action.response && action.response.username) {
                return {
                    ...state,
                    loggedIn: true,
                    isFetching: false,
                    loginStatusCode: null,
                    loginSource: 'session',
                    username: action.response.username,
                    auditor: action.response.auditor,
                    teacher: action.response.teacher,
                    userInfo: action.response.userInfo || null
                }
            } else {
                return { ...state, loggedIn: false, isFetching: false, username: null, userInfo: null, loginStatusCode: null, loginSource: null }
            }
        }
        default:
            return state;
    }
}

export default reducer
