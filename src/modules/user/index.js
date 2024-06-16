//Actions
const SHOW_PASSWORD_RESET_MODAL = 'show_password_reset_modal'
const GET_DEPT_1 = 'get_dept_1'
const GET_DEPT_2 = 'get_dept_2'
const UPDATE_DEPT_1 = 'update_dept_1'
const UPDATE_DEPT_2 = 'update_dept_2'
const DEPT_1_ERROR = 'dept_1_error'
const DEPT_2_ERROR = 'dept_2_error'
const POST_RESET_PASSWORD = 'post_reset_password'
const UPDATE_RESET_PASSWORD = 'update_reset_password'
const GET_EDUCATION = 'get_education'
const UPDATE_EDUCATION = 'update_education'
const POST_FACE_DETECT_OSS = 'post_face_detect_oss'
const UPDATE_FACE_DETECT_OSS = 'update_face_detect_oss'

export const types = {
    SHOW_PASSWORD_RESET_MODAL,
    GET_DEPT_1,
    GET_DEPT_2,
    UPDATE_DEPT_1,
    UPDATE_DEPT_2,
    DEPT_1_ERROR,
    DEPT_2_ERROR,
    POST_RESET_PASSWORD,
    UPDATE_RESET_PASSWORD,
    GET_EDUCATION,
    UPDATE_EDUCATION,
    POST_FACE_DETECT_OSS,
    UPDATE_FACE_DETECT_OSS
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

const updateResetPassword = data => ({
    type: UPDATE_RESET_PASSWORD,
    data
})

const postResetPassword = payload => ({
    type: POST_RESET_PASSWORD,
    payload
})

const getEducation = payload => ({
    type: GET_EDUCATION,
    payload
})

const updateEducation = data => ({
    type: UPDATE_EDUCATION,
    data
})

const updateFaceDetectOSS = data => ({
    type: UPDATE_FACE_DETECT_OSS,
    data
})

const postFaceDetectOSS = payload => ({
    type: POST_FACE_DETECT_OSS,
    payload
})

export const actions = {
    setPasswordResetModal,
    getDept1,
    getDept2,
    updateDept1,
    updateDept2,
    dept1Error,
    dept2Error,
    updateResetPassword,
    postResetPassword,
    getEducation,
    updateEducation,
    postFaceDetectOSS,
    updateFaceDetectOSS
}

const initialState = {
    passwordResetModalVisible: false,
    email: 'email@email.com',
    dept1List: [],
    dept2List: [],
    resetMessage: null,
    resetStatus: null,
    educationList: [],
    faceDetectOSS: null
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
        case UPDATE_RESET_PASSWORD: {
            return {
                ...state,
                resetMessage: action.data.msg,
                resetStatus: action.data.status
            }
        }
        case UPDATE_DEPT_2:
            return {
                ...state,
                dept2List: action.data
            }
        case UPDATE_EDUCATION:
            return {
                ...state,
                educationList: action.data
            }
        case UPDATE_FACE_DETECT_OSS:
            return {
                ...state,
                faceDetectOSS: action.data
            }
        default:
            return state;
    }
}

export default reducer