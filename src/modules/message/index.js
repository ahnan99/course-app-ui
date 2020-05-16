//Actions
const POST_MESSAGE = 'post_message'
const UPDATE_POST_MESSAGE = 'update_post_message'
const GET_MESSAGE_TYPE = 'get_message_type'
const UPDATE_MESSAGE_TYPE = 'update_message_type'
const GET_MESSAGE = 'get_message'
const UPDATE_MESSAGE = 'update_message'
const GET_SINGLE_MESSAGE = 'get_single_message'
const UPDATE_SINGLE_MESSAGE = 'update_single_message'

export const types = {
    POST_MESSAGE,
    UPDATE_POST_MESSAGE,
    GET_MESSAGE_TYPE,
    UPDATE_MESSAGE_TYPE,
    GET_MESSAGE,
    UPDATE_MESSAGE,
    GET_SINGLE_MESSAGE,
    UPDATE_SINGLE_MESSAGE
}

//Action creators
const postMessage = payload =>({
    type: POST_MESSAGE,
    payload
})

const updatePostMessage = response => ({
    type: UPDATE_POST_MESSAGE,
    response
})

const getMessageType = payload =>({
    type: GET_MESSAGE_TYPE,
    payload
})

const updateMessageType = data =>({
    type: UPDATE_MESSAGE_TYPE,
    data
})

const getSingleMessage = payload =>({
    type: GET_SINGLE_MESSAGE,
    payload
})

const updateSingleMessage = data =>({
    type: UPDATE_SINGLE_MESSAGE,
    data
})

const getMessage = payload =>({
    type: GET_MESSAGE,
    payload
})

const updateMessage = data => ({
    type:UPDATE_MESSAGE,
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
    updateSingleMessage
}


const initialState = {
    postMessageRes: null,
    messageTypes: [],
    singleMessage: null,
    messageList: []
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
        default:
            return state;
    }
}

export default reducer