//Actions
const SHOW_PASSWORD_RESET_MODAL = 'show_password_reset_modal'

//Action creators
const setPasswordResetModal = passwordResetModalVisible =>({
    type: SHOW_PASSWORD_RESET_MODAL,
    payload:{
        passwordResetModalVisible
    }
});

export const actions ={
    setPasswordResetModal
}

const initialState = {
    passwordResetModalVisible: false,
    email: 'email@email.com'
}

//Reducers
const reducer = (state = initialState, action = {}) => {
    switch(action.type){
        case SHOW_PASSWORD_RESET_MODAL:
        return {
            ...state,
            ...action.payload
        }
        default:
            return state;
    }
    
    
}   

export default reducer