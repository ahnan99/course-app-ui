//Actions
const USER_LOGIN = 'user_login'

//Action creators
const userLogin = () =>({
    type: USER_LOGIN
});

export const actions ={
    userLogin
}

const initialState = {
    loggedIn: false,
    username: null,
    password: null
}
//Reducers
const reducer = (state = initialState, action = {}) => {
    switch(action.type){
        case USER_LOGIN:
        return {
            ...state,
            loggedIn: true
        }
        default:
            return state;
    }
    
    
}   

export default reducer