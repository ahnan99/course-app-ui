//Actions
const GET_SELECTED_CERT = 'get_selected_cert'
const UPDATE_SELECTED_CERT = 'update_selected_cert'
const GET_CERT_COURSE = 'get_cert_course'
const UPDATE_CERT_COURSE = 'update_cert_course'
const GET_REST_CERT = 'get_rest_cert'
const UPDATE_REST_CERT = 'update_rest_cert'
const POST_DEL_CERT = 'post_del_cert'
const UPDATE_DEL_CERT = 'update_del_cert'
const POST_ADD_CERT = 'post_add_cert'
const UPDATE_ADD_CERT = 'update_add_cert'
const RESET_DEL_CERT = 'reset_del_cert'
const RESET_ADD_CERT = 'reset_add_cert'
const GET_ACCOMPLISHED = 'get accomplished'
const UPDATE_ACCOMPLISHED = 'update accomplished'
const UPDATE_EMPTY_ACCOMPLISHED = 'update_empty_accomplished'

export const types = {
    GET_SELECTED_CERT,
    UPDATE_SELECTED_CERT,
    GET_CERT_COURSE,
    UPDATE_CERT_COURSE,
    GET_REST_CERT,
    UPDATE_REST_CERT,
    POST_DEL_CERT,
    UPDATE_DEL_CERT,
    POST_ADD_CERT,
    UPDATE_ADD_CERT,
    RESET_DEL_CERT,
    RESET_ADD_CERT,
    GET_ACCOMPLISHED,
    UPDATE_ACCOMPLISHED,
    UPDATE_EMPTY_ACCOMPLISHED
}

//Action creators
const getSelectedCert = payload => ({
    type: GET_SELECTED_CERT,
    payload
})

const updateSelectedCert = data => ({
    type: UPDATE_SELECTED_CERT,
    data
})

const getCertCourse = payload => ({
    type: GET_CERT_COURSE,
    payload
})

const updateCertCourse = data => ({
    type: UPDATE_CERT_COURSE,
    data
})

const getRestCert = payload => ({
    type: GET_REST_CERT,
    payload
})

const updateRestCert = data => ({
    type: UPDATE_REST_CERT,
    data
})

const postDelCert = payload => ({
    type: POST_DEL_CERT,
    payload
})

const updateDelCert = data => ({
    type: UPDATE_DEL_CERT,
    data
})

const postAddCert = payload => ({
    type: POST_ADD_CERT,
    payload
})

const updateAddCert = data => ({
    type: UPDATE_ADD_CERT,
    data
})

const resetDelCert = () => ({
    type: RESET_DEL_CERT
})

const resetAddCert = () => ({
    type: RESET_ADD_CERT
})

const getAccomplished = payload => ({
    type: GET_ACCOMPLISHED,
    payload
})

const updateAccomplished = data => ({
    type: UPDATE_ACCOMPLISHED,
    data
})


const updateEmptyAccomplished = data => ({
    type: UPDATE_EMPTY_ACCOMPLISHED,
    data
})

export const actions = {
    getCertCourse,
    getSelectedCert,
    updateCertCourse,
    updateSelectedCert,
    getRestCert,
    updateRestCert,
    postDelCert,
    updateDelCert,
    postAddCert,
    updateAddCert,
    resetDelCert,
    resetAddCert,
    getAccomplished,
    updateAccomplished,
    updateEmptyAccomplished
}

const initialState = {
    selectedCert: [],
    certCourse: [],
    restCert: [],
    delCertRes: null,
    addCertRes: null,
    fetchingSelected: false,
    fetchingCourse: false,
    fetchingRest: false,
    accomplished: [],
    emptyAccomplished: false
}

//Reducers
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_SELECTED_CERT:
            return {
                ...state,
                fetchingSelected: true
            }
        case GET_CERT_COURSE:
            return {
                ...state,
                fetchingCourse: true
            }
        case GET_REST_CERT:
            return {
                ...state,
                fetchingRest: true
            }
        case UPDATE_SELECTED_CERT:
            return {
                ...state,
                selectedCert: action.data,
                fetchingSelected: false
            }
        case UPDATE_REST_CERT:
            return {
                ...state,
                restCert: action.data,
                fetchingRest: false
            }
        case UPDATE_CERT_COURSE:
            return {
                ...state,
                certCourse: action.data,
                fetchingCourse: false
            }
        case UPDATE_DEL_CERT:
            return {
                ...state,
                delCertRes: action.data
            }
        case UPDATE_ADD_CERT:
            return {
                ...state,
                addCertRes: action.data
            }
        case RESET_ADD_CERT:
            return {
                ...state,
                addCertRes: null
            }
        case RESET_DEL_CERT:
            return {
                ...state,
                delCertRes: null
            }
        case UPDATE_ACCOMPLISHED: {
            return {
                ...state,
                accomplished: action.data
            }
        }
        case UPDATE_EMPTY_ACCOMPLISHED:
            return {
                ...state,
                emptyAccomplished: action.data
            }
        default:
            return state;
    }


}

export default reducer