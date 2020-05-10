//Actions
const REQUEST_LOGIN = 'request_login'
const USER_LOGIN = 'user_login'
const USER_LOGIN_ERROR = 'request_login_error'
const REQUEST_REGISTER = 'request_register'//submit form
const USER_REGISTER = 'user_register' //receive repsonse
const USER_REGISTER_ERROR = 'request_register_error'//receive error
const RESET_REGISTER_STATUS = 'reset_register_status'
const GET_USER_INFO = 'get_user_info'
const UPDATE_USER_INFO = 'update_user_info'
const POST_USER_INFO = 'post_user_info'
const UPDATE_POST_USER_INFO = 'update_post_user_info'
const RESET_POST_USER_INFO = 'reset_post_user_info'
const UPDATE_LOGIN_STATUS = 'update_login_status'

export const types = {
    REQUEST_LOGIN,
    USER_LOGIN,
    USER_LOGIN_ERROR,
    REQUEST_REGISTER,
    USER_REGISTER,
    USER_REGISTER_ERROR,
    RESET_REGISTER_STATUS,
    GET_USER_INFO,
    UPDATE_USER_INFO,
    POST_USER_INFO,
    UPDATE_POST_USER_INFO,
    RESET_POST_USER_INFO,
    UPDATE_LOGIN_STATUS
}

//Action creators
const requestLogin = payload => ({
    type: REQUEST_LOGIN,
    payload
})


const userLogin = response => ({
    type: USER_LOGIN,
    response
});

const userLoginError = response => ({
    type: USER_LOGIN_ERROR,
    response
})

const requestRegister = payload => ({
    type: REQUEST_REGISTER,
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

const resetRegisterStatus = () => ({
    type: RESET_REGISTER_STATUS
})

const getUserInfo = payload => ({
    type: GET_USER_INFO,
    payload
})

const updateUserInfo = data => ({
    type: UPDATE_USER_INFO,
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

const updateLoginStatus = data =>({
    type:UPDATE_LOGIN_STATUS,
    data
})

export const actions = {
    userLogin,
    requestLogin,
    userLoginError,
    requestRegister,
    userRegister,
    userRegisterError,
    resetRegisterStatus,
    getUserInfo,
    postUserInfo,
    updateUserInfo,
    updatePostUserInfo,
    resetPostUserInfo,
    updateLoginStatus
}

const initialState = {
    loggedIn: false,
    username: null,
    isFetching: false,
    loginError: null,
    registered: false,
    registerError: null,
    userInfo:null,
    postUserInfoStatus:null
}
//Reducers
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case USER_LOGIN: {
            if (action.response.status === 0) {
                return {
                    ...state,
                    loggedIn: true,
                    loginError: null,
                    username: action.response.username
                }
            } else if (action.response.sessionExpire === 1) {
                return {
                    ...state,
                    loggedIn: false
                }
            } else {
                return {
                    ...state,
                    loginError: action.response.msg
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
        case RESET_POST_USER_INFO:{
            return {
                ...state,
                postUserInfoStatus: null
            }
        }
        case UPDATE_LOGIN_STATUS:{
            return {
                ...state,
                loggedIn: action.data
            }
        }
        default:
            return state;
    }


}

export default reducer