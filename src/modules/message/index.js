//Actions
const POST_MESSAGE = 'post_message'
const UPDATE_POST_MESSAGE = 'update_post_message'
const GET_MESSAGE_TYPE = 'get_message_type'
const UPDATE_MESSAGE_TYPE = 'update_message_type'

export const types = {
    POST_MESSAGE,
    UPDATE_POST_MESSAGE,
    GET_MESSAGE_TYPE,
    UPDATE_MESSAGE_TYPE
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

export const actions = {
    updateMessageType,
    updatePostMessage,
    getMessageType,
    postMessage
}


const initialState = {
    postMessageRes: null,
    messageTypes: []
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
        default:
            return state;
    }
}

export default reducer