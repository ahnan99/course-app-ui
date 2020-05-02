//Actions
const UPDATE_COURSELIST = 'update_course_list'
const GET_COURSELIST = 'get_course_list'

export const types = {
    UPDATE_COURSELIST,
    GET_COURSELIST
}

//Action creators
const updateCourseList = courses =>({
    type: UPDATE_COURSELIST,
    payload:{
        courses
    }
});

const getCourseList = () =>({
    type: GET_COURSELIST
})


export const actions ={
    updateCourseList,
    getCourseList
}

const initialState = {
    courses: []
}
//Reducers
const reducer = (state = initialState, action = {}) => {
    switch(action.type){
        case UPDATE_COURSELIST:
        return {
            ...state,
            ...action.payload
        }
        default:
            return state;
    }
    
    
}   

export default reducer