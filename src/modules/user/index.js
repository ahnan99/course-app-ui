//Actions
const SHOW_PASSWORD_RESET_MODAL = 'show_password_reset_modal'
const GET_DEPT_1 = 'get_dept_1'
const GET_DEPT_2 = 'get_dept_2'
const UPDATE_DEPT_1 = 'update_dept_1'
const UPDATE_DEPT_2 = 'update_dept_2'
const DEPT_1_ERROR = 'dept_1_error'
const DEPT_2_ERROR = 'dept_2_error'

export const types = {
    SHOW_PASSWORD_RESET_MODAL,
    GET_DEPT_1,
    GET_DEPT_2,
    UPDATE_DEPT_1,
    UPDATE_DEPT_2,
    DEPT_1_ERROR,
    DEPT_2_ERROR
}

//Action creators
const setPasswordResetModal = passwordResetModalVisible => ({
    type: SHOW_PASSWORD_RESET_MODAL,
    payload: {
        passwordResetModalVisible
    }
});

const getDept1 = payload => ({
    type: GET_DEPT_1,
    payload
})

const updateDept1 = data => ({
    type: UPDATE_DEPT_1,
    data
})

const dept1Error = data => ({
    type: DEPT_1_ERROR,
    data
})

const dept2Error = data => ({
    type: DEPT_2_ERROR,
    data
})

const getDept2 = payload => ({
    type: GET_DEPT_2,
    payload
})

const updateDept2 = data => ({
    type: UPDATE_DEPT_2,
    data
})

export const actions = {
    setPasswordResetModal,
    getDept1,
    getDept2,
    updateDept1,
    updateDept2,
    dept1Error,
    dept2Error
}

const initialState = {
    passwordResetModalVisible: false,
    email: 'email@email.com',
    dept1List: [],
    dept2List: []
}

//Reducers
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SHOW_PASSWORD_RESET_MODAL:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_DEPT_1:
            if (action.data.sessionExpire === 1) {
                break;
            }
            return {
                ...state,
                dept1List: action.data
            }
        case UPDATE_DEPT_2:
            return {
                ...state,
                dept2List: action.data
            }
        default:
            return state;
    }


}

export default reducer