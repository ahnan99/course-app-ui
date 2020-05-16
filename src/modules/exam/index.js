//Actions 
const GET_EXAM = "get_exam"
const UPDATE_EXAM = "update_exam"
const POST_EXAM = "post_exam"
const UPDATE_POST_EXAM = "update_post_exam"
const GET_EXAM_QUESTION = "get_exam_question"
const UPDATE_EXAM_QUESTION = "update_exam_question"
const POST_TIME = "post_time"
const UPDATE_POST_TIME = "update_post_time"
const POST_SINGLE_QUESION = "post_single_question"
const UPDATE_POST_SINGLE_QUESTION = "update_post_single_question"

export const types ={
    GET_EXAM,
    UPDATE_EXAM,
    POST_EXAM,
    UPDATE_POST_EXAM,
    POST_TIME,
    UPDATE_POST_TIME,
    GET_EXAM_QUESTION,
    UPDATE_EXAM_QUESTION,
    UPDATE_POST_SINGLE_QUESTION,
    POST_SINGLE_QUESION
}

//Action creators
const getExam = payload =>({
    type: GET_EXAM,
    payload
})

const updateExam = data =>({
    type: UPDATE_EXAM,
    data
})

const postExam = payload =>({
    type: POST_EXAM,
    payload
})

const updatePostExam = response =>({
    type: UPDATE_POST_EXAM,
    response
})

const getExamQuestion = payload =>({
    type: GET_EXAM_QUESTION,
    payload
})

const updateExamQuestion = data =>({
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

export const actions ={
    getExam,
    getExamQuestion,
    postExam,
    postTime,
    updateExam,
    updateExamQuestion,
    updatePostExam,
    updatePostTime,
    postSingleQuestion,
    updatePostSingleQuestion
}

//reducer

const initialState = {
    exam: null,
    examQuestion: null,
    postExamRes: null,
    postTimeRes: null,
    postSingleQuestionRes: null
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
        case UPDATE_POST_SINGLE_QUESTION:{
            return {
                ...state,
                postSingleQuestionRes: action.response
            }
        }
        default:
            return state;
    }
}

export default reducer