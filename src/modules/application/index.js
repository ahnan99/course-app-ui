//Actions
const REQUEST_LOGIN = 'request_login'
const USER_LOGIN = 'user_login'
const USER_LOGIN_ERROR = 'request_login_error'
const REQUEST_REGISTER = 'request_register'//submit form
const USER_REGISTER = 'user_register' //receive repsonse
const USER_REGISTER_ERROR = 'request_register_error'//receive error
const RESET_REGISTER_STATUS = 'reset_register_status'

export const types = {
    REQUEST_LOGIN,
    USER_LOGIN,
    USER_LOGIN_ERROR,
    REQUEST_REGISTER,
    USER_REGISTER,
    USER_REGISTER_ERROR,
    RESET_REGISTER_STATUS
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

export const actions = {
    userLogin,
    requestLogin,
    userLoginError,
    requestRegister,
    userRegister,
    userRegisterError,
    resetRegisterStatus
}

const initialState = {
    loggedIn: false,
    username: null,
    isFetching: false,
    loginError: null,
    registered: false,
    registerError: null
}
//Reducers
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case USER_LOGIN: {
            if (action.response.status === 0) {
                return {
                    ...state,
                    loggedIn: true,
                    loginError: null
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
        default:
            return state;
    }


}

export default reducer