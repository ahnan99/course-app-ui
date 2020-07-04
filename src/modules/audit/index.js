//Actions

const GET_CERT_LIST = "get_cert_list"
const UPDATE_CERT_LIST = "update_cert_list"
const GET_FIND_STUDENT = "get_find_studnet"
const UPDATE_FIND_STUDENT = "update_find_student"
const UPDATE_FILTER = "update_filter"
const UPDATE_SELECTED_CERT = 'update_selected_cert'

export const types = {
    GET_CERT_LIST,
    UPDATE_CERT_LIST,
    GET_FIND_STUDENT,
    UPDATE_FIND_STUDENT,
    UPDATE_FILTER,
    UPDATE_SELECTED_CERT
}

//Action creators
const getCertList = payload => ({
    type: GET_CERT_LIST,
    payload
})

const updateCertList = data => ({
    type: UPDATE_CERT_LIST,
    data
})

const getFindStudent = payload => ({
    type: GET_FIND_STUDENT,
    payload
})

const updateFindStudent = data => ({
    type: UPDATE_FIND_STUDENT,
    data
})

const updateFilter = data => ({
    type: UPDATE_FILTER,
    data
})

const updateSelectedCert = data =>({
    type: UPDATE_SELECTED_CERT,
    data
})

const initialState = {
    findStudent: [],
    certList: null,
    selectedCert: null,
    filter: ""
}

export const actions = {
    getCertList,
    updateCertList,
    getFindStudent,
    updateFindStudent,
    updateFilter,
    updateSelectedCert
}

//Reducer

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_FIND_STUDENT: {
            return {
                ...state,
                findStudent: action.data
            }
        }
        case UPDATE_CERT_LIST: {
            return {
                ...state,
                certList: action.data
            }
        }
        case UPDATE_FILTER: {
            return{
                ...state,
                filter: action.data
            }
        }
        case UPDATE_SELECTED_CERT: {
            return{
                ...state,
                selectedCert: action.data
            }
        }
        default:
            return state;
    }
}

export default reducer