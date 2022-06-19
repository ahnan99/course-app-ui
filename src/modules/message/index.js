//Actions
const POST_MESSAGE = 'post_message'
const UPDATE_POST_MESSAGE = 'update_post_message'
const GET_MESSAGE_TYPE = 'get_message_type'
const UPDATE_MESSAGE_TYPE = 'update_message_type'
const GET_MESSAGE = 'get_message'
const UPDATE_MESSAGE = 'update_message'
const GET_SINGLE_MESSAGE = 'get_single_message'
const UPDATE_SINGLE_MESSAGE = 'update_single_message'
const GET_CLASS_COMMENT = 'get_class_comment'
const UPDATE_CLASS_COMMENT = 'update_class_comment'
const POST_CLASS_COMMENT = 'post_class_comment'
const UPDATE_POST_CLASS_COMMENT = 'update_post_class_comment'
const DELETE_CLASS_COMMENT = 'delete_class_comment'
const UPDATE_DELETE_CLASS_COMMENT = 'update_delete_class_comment'


export const types = {
    POST_MESSAGE,
    UPDATE_POST_MESSAGE,
    GET_MESSAGE_TYPE,
    UPDATE_MESSAGE_TYPE,
    GET_MESSAGE,
    UPDATE_MESSAGE,
    GET_SINGLE_MESSAGE,
    UPDATE_SINGLE_MESSAGE,
    GET_CLASS_COMMENT,
    UPDATE_CLASS_COMMENT,
    POST_CLASS_COMMENT,
    UPDATE_POST_CLASS_COMMENT,
    DELETE_CLASS_COMMENT,
    UPDATE_DELETE_CLASS_COMMENT
}

//Action creators
const postMessage = payload => ({
    type: POST_MESSAGE,
    payload
})

const updatePostMessage = response => ({
    type: UPDATE_POST_MESSAGE,
    response
})

const getMessageType = payload => ({
    type: GET_MESSAGE_TYPE,
    payload
})

const updateMessageType = data => ({
    type: UPDATE_MESSAGE_TYPE,
    data
})

const getSingleMessage = payload => ({
    type: GET_SINGLE_MESSAGE,
    payload
})

const updateSingleMessage = data => ({
    type: UPDATE_SINGLE_MESSAGE,
    data
})

const getMessage = payload => ({
    type: GET_MESSAGE,
    payload
})

const updateMessage = data => ({
    type: UPDATE_MESSAGE,
    data
})

const getClassComment = payload => ({
    type: GET_CLASS_COMMENT,
    payload
})

const deleteClassComment = payload => ({
    type: DELETE_CLASS_COMMENT,
    payload
})

const postClassComment = payload => ({
    type: POST_CLASS_COMMENT,
    payload
})

const updateClassComment = data => ({
    type: UPDATE_CLASS_COMMENT,
    data
})

const updatePostClassComment = data => ({
    type: UPDATE_POST_CLASS_COMMENT,
    data
})

const updateDeleteClassComment = data => ({
    type: UPDATE_DELETE_CLASS_COMMENT,
    data
})


export const actions = {
    updateMessageType,
    updatePostMessage,
    getMessageType,
    postMessage,
    getMessage,
    updateMessage,
    getSingleMessage,
    updateSingleMessage,
    updateDeleteClassComment,
    deleteClassComment,
    updateClassComment,
    getClassComment,
    updatePostClassComment,
    postClassComment
}


const initialState = {
    postMessageRes: null,
    messageTypes: [],
    singleMessage: null,
    messageList: [],
    classComment: [],
    postClassComment: null,
    deleteClassComment: null
}
//Reducers
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_MESSAGE_TYPE: {
            return {
                ...state,
                messageTypes: action.data
            }
        }
        case UPDATE_POST_MESSAGE: {
            return {
                ...state,
                postMessageRes: action.response
            }
        }
        case UPDATE_MESSAGE: {
            return {
                ...state,
                messageList: action.data
            }
        }
        case UPDATE_SINGLE_MESSAGE: {
            return {
                ...state,
                singleMessage: action.data
            }
        }
        case UPDATE_DELETE_CLASS_COMMENT: {
            return {
                ...state,
                deleteClassComment: action.data
            }
        }
        case UPDATE_CLASS_COMMENT: {
            return {
                ...state,
                classComment: action.data
            }
        }
        case UPDATE_POST_CLASS_COMMENT: {
            return {
                ...state,
                postClassComment: action.data
            }
        }
        default:
            return state;
    }
}

export default reducer