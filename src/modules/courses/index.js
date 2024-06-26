//Actions
const GET_COURSELIST = 'get_course_list'
const UPDATE_COURSELIST = 'update_course_list'
const GET_LESSONLIST = 'get_lesson_list'
const UPDATE_LESSONLIST = 'update_lesson_list'
const GET_VIDEO = 'get_video'
const UPDATE_VIDEO = 'update_video'
const GET_PDF ='get_pdf'
const UPDATE_PDF = 'update_pdf'
const POST_MAX_TIME = 'post_max_time'
const UPDATE_MAX_TIME = 'update_max_time'
const POST_MAX_PAGE = 'post_max_page'
const UPDATE_MAX_PAGE = 'update_max_page'
const UPDATE_CURRENT_LESSON = 'update_current_lesson'
const UPDATE_CURRENT_PDF = 'update_current_pdf'
const POST_SIGNATURE = 'post_signature'
const POST_PAYMENT = 'post_payment'
const POST_INVOICE = 'post_invoice'
const UPDATE_SIGNATURE = 'update_signature'
const UPDATE_PAYMENT = 'update_payment'

export const types = {
    UPDATE_COURSELIST,
    GET_COURSELIST,
    GET_LESSONLIST,
    UPDATE_LESSONLIST,
    GET_VIDEO,
    UPDATE_VIDEO,
    GET_PDF,
    UPDATE_PDF,
    POST_MAX_TIME,
    UPDATE_MAX_TIME,
    POST_MAX_PAGE,
    UPDATE_MAX_PAGE,
    UPDATE_CURRENT_LESSON,
    UPDATE_CURRENT_PDF,
    POST_SIGNATURE,
    UPDATE_SIGNATURE,
    POST_PAYMENT,
    POST_INVOICE,
    UPDATE_PAYMENT
}

//Action creators
const updateCourseList = data => ({
    type: UPDATE_COURSELIST,
    data
});

const getCourseList = payload => ({
    type: GET_COURSELIST,
    payload
})

const updateLessonList= data => ({
    type: UPDATE_LESSONLIST,
    data
})

const getLessonList = payload => ({
    type: GET_LESSONLIST,
    payload
})

const getVideo = payload => ({
    type: GET_VIDEO,
    payload
})

const updateVideo = data => ({
    type: UPDATE_VIDEO,
    data
})

const getPDF = payload => ({
    type: GET_PDF,
    payload
})

const updatePDF = data => ({
    type: UPDATE_PDF,
    data
})

const postMaxTime = payload => ({
    type: POST_MAX_TIME,
    payload
})

const updateMaxTime = data => ({
    type: UPDATE_MAX_TIME,
    data
})

const postMaxPage = payload => ({
    type: POST_MAX_PAGE,
    payload
})

const updateMaxPage = data => ({
    type: UPDATE_MAX_PAGE,
    data
})

const updateCurrentLesson = data =>({
    type: UPDATE_CURRENT_LESSON,
    data
})

const updateCurrentPDF = data =>({
    type: UPDATE_CURRENT_PDF,
    data
})

const postSignature = payload => ({
    type: POST_SIGNATURE,
    payload
})

const updateSignature = data => ({
    type: UPDATE_SIGNATURE,
    data
})

const postPayment = payload => ({
    type: POST_PAYMENT,
    payload
})

const updatePayment = data => ({
    type: UPDATE_PAYMENT,
    data
})

export const actions = {
    updateCourseList,
    getCourseList,
    updateLessonList,
    getLessonList,
    getVideo,
    updateVideo,
    getPDF,
    updatePDF,
    postMaxPage,
    updateMaxPage,
    postMaxTime,
    updateMaxTime,
    updateCurrentLesson,
    updateCurrentPDF,
    postSignature,
    updateSignature,
    postPayment,
    updatePayment
}

const initialState = {
    courses: [],
    lessons: [],
    currentLesson: null,
    maxTimeRes: {},
    maxPageRes: {},
    video: null,
    PDF: null,
    currentPDF: null,
    postSignature: null,
    postPayment: null
}
//Reducers
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_COURSELIST: {
                return {
                    ...state,
                    courses: action.data
                }
        }
        case UPDATE_LESSONLIST: {
            return {
                ...state,
                lessons: action.data
            }
        }
        case UPDATE_VIDEO: {
            return {
                ...state,
                video: action.data
            }
        }
        case UPDATE_PDF: {
            return {
                ...state,
                PDF: action.data
            }
        }
        case UPDATE_MAX_TIME: {
            return {
                ...state,
                maxTimeRes: action.data
            }
        }
        case UPDATE_MAX_PAGE: {
            return {
                ...state,
                maxPageRes: action.data
            }
        }
        case UPDATE_CURRENT_LESSON: {
            return {
                ...state,
                currentLesson: action.data
            }
        }
        case UPDATE_CURRENT_PDF: {
            return {
                ...state,
                currentPDF: action.data
            }
        }
        case UPDATE_SIGNATURE: {
            return {
                ...state,
                postSignature: action.data
            }
        }
        case UPDATE_PAYMENT: {
            return {
                ...state,
                postPayment: action.data
            }
        }
        default:
            return state;
    }
}

export default reducer