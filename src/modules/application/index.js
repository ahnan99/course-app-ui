//Actions
const USER_LOGIN = 'user_login'
const REQUEST_LOGIN = 'request_login'

export const types = {
    USER_LOGIN,
    REQUEST_LOGIN
}

//Action creators
const userLogin = response => ({
    type: USER_LOGIN,
    response
});

const requestLogin = payload => ({
    type: REQUEST_LOGIN,
    payload
})

export const actions = {
    userLogin,
    requestLogin
}

const initialState = {
    loggedIn: false,
    username: null,
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