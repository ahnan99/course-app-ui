//Actions
const USER_LOGIN = 'user_login'
const REQUEST_LOGIN = 'request_login'
const REQUEST_LOGIN_ERROR = 'request_login_error'

export const types = {
    USER_LOGIN,
    REQUEST_LOGIN,
    REQUEST_LOGIN_ERROR
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

const userLoginError = response =>({
    type: REQUEST_LOGIN_ERROR,
    response
})

export const actions = {
    userLogin,
    requestLogin,
    userLoginError
}

const initialState = {
    loggedIn: false,
    username: null,
    isFetching: false,
    loginError: null
}
//Reducers
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case USER_LOGIN: {
            if (action.response.status === 0){
                return {
                    ...state,
                    loggedIn: true
                }
            }
                
        }

        default:
            return state;
    }


}

export default reducer