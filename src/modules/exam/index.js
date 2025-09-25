//Actions 
const GET_EXAM = "get_exam"
const UPDATE_EXAM = "update_exam"
const GET_REAL_EXAM = "get_real_exam"
const UPDATE_REAL_EXAM = "update_real_exam"
const POST_EXAM = "post_exam"
const UPDATE_POST_EXAM = "update_post_exam"
const GET_EXAM_QUESTION = "get_exam_question"
const UPDATE_EXAM_QUESTION = "update_exam_question"
const POST_TIME = "post_time"
const UPDATE_POST_TIME = "update_post_time"
const POST_SINGLE_QUESION = "post_single_question"
const UPDATE_POST_SINGLE_QUESTION = "update_post_single_question"
const UPDATE_LEAVE = "update_leave"
const GET_REAL_EXAM_LIST = "get_real_exam_list"
const UPDATE_REAL_EXAM_LIST = "update_real_exam_list"
const UPDATE_busyGetExamQuestion = "update_busyGetExamQuestion"
const POST_TOTALEXAM_NUM = "post_totalexam_num"
const SET_FAVORITE = "set_favorite"
const UPDATE_SET_FAVORITE = "update_set_favorite"
const UPDATE_POST_TOTALEXAM_NUM = "update_post_totalexam_num"

export const types = {
    GET_EXAM,
    UPDATE_EXAM,
    UPDATE_LEAVE,
    GET_REAL_EXAM,
    UPDATE_REAL_EXAM,
    GET_REAL_EXAM_LIST,
    UPDATE_REAL_EXAM_LIST,
    POST_EXAM,
    UPDATE_POST_EXAM,
    POST_TIME,
    UPDATE_POST_TIME,
    GET_EXAM_QUESTION,
    UPDATE_EXAM_QUESTION,
    UPDATE_POST_SINGLE_QUESTION,
    POST_SINGLE_QUESION,
    POST_TOTALEXAM_NUM,
    UPDATE_POST_TOTALEXAM_NUM,
    UPDATE_SET_FAVORITE,
    SET_FAVORITE
}

//Action creators
const getExam = payload => ({
    type: GET_EXAM,
    payload
})

const updateExam = data => ({
    type: UPDATE_EXAM,
    data
})

const updateLeave = data => ({
    type: UPDATE_LEAVE,
    data
})

const getRealExam = payload => ({
    type: GET_REAL_EXAM,
    payload
})

const updateRealExam = data => ({
    type: UPDATE_REAL_EXAM,
    data
})

const getRealExamList = payload => ({
    type: GET_REAL_EXAM_LIST,
    payload
})

const updateRealExamList = data => ({
    type: UPDATE_REAL_EXAM_LIST,
    data
})


const postExam = payload => ({
    type: POST_EXAM,
    payload
})

const updatePostExam = response => ({
    type: UPDATE_POST_EXAM,
    response
})

const getExamQuestion = payload => ({
    type: GET_EXAM_QUESTION,
    payload
})

const updateExamQuestion = data => ({
    type: UPDATE_EXAM_QUESTION,
    data
})

const postTime = payload => ({
    type: POST_TIME,
    payload
})

const updatePostTime = response => ({
    type: UPDATE_POST_TIME,
    response
})

const postSingleQuestion = payload => ({
    type: POST_SINGLE_QUESION,
    payload
})

const updatePostSingleQuestion = response => ({
    type: UPDATE_POST_SINGLE_QUESTION,
    response
})

const postTotalExamNum = payload => ({
    type: POST_TOTALEXAM_NUM,
    payload
})

const setFavorite = payload => ({
    type: SET_FAVORITE,
    payload
})

const updatePostTotalExamNum = response => ({
    type: UPDATE_POST_TOTALEXAM_NUM,
    response
})

const updateSetFavorite = response => ({
    type: UPDATE_SET_FAVORITE,
    response
})

const updateBusyGetExamQuestion = data => ({
    type: UPDATE_busyGetExamQuestion,
    data
})

export const actions = {
    getExam,
    getExamQuestion,
    postExam,
    postTime,
    updateExam,
    updateExamQuestion,
    updatePostExam,
    updatePostTime,
    postSingleQuestion,
    updatePostSingleQuestion,
    getRealExam,
    updateRealExam,
    updateLeave,
    getRealExamList,
    updateRealExamList,
    updateBusyGetExamQuestion,
    postTotalExamNum,
    updatePostTotalExamNum,
    setFavorite,
    updateSetFavorite
}

//reducer

const initialState = {
    exam: null,
    realExam: null,
    realExamList: null,
    examQuestion: null,
    examQuestionRes: null,
    postExamRes: null,
    postTimeRes: null,
    postSingleQuestionRes: null,
    postTotalExamNumRes: null,
    setFavorite: null,
    leave: true,
    busyGetExamQuestion: 0
}
//Reducers
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_POST_TIME: {
            return {
                ...state,
                postTimeRes: action.response
            }
        }
        case UPDATE_EXAM: {
            return {
                ...state,
                exam: action.data
            }
        }
        case UPDATE_REAL_EXAM: {
            return {
                ...state,
                realExam: action.data
            }
        }
        case UPDATE_POST_EXAM: {
            return {
                ...state,
                postExamRes: action.response
            }
        }
        case UPDATE_EXAM_QUESTION: {
            return {
                ...state,
                examQuestion: action.data
            }
        }
        case UPDATE_LEAVE: {
            return {
                ...state,
                leave: action.data
            }
        }
        case UPDATE_POST_SINGLE_QUESTION: {
            return {
                ...state,
                postSingleQuestionRes: action.response
            }
        }
        case UPDATE_REAL_EXAM_LIST: {
            return {
                ...state,
                realExamList: action.data
            }
        }
        case UPDATE_POST_TOTALEXAM_NUM: {
            return {
                ...state,
                postTotalExamNumRes: action.response
            }
        }
        case UPDATE_SET_FAVORITE: {
            return {
                ...state,
                setFavorite: action.response
            }
        }
        case UPDATE_REAL_EXAM_LIST: {
            return {
                ...state,
                realExamList: action.data
            }
        }
        case UPDATE_busyGetExamQuestion: {
            return {
                ...state,
                busyGetExamQuestion: action.data
            }
        }
        default:
            return state;
    }
}

export default reducer