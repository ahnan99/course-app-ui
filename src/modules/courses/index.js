//Actions
const GET_COURSELIST = 'get_course_list'
const UPDATE_COURSELIST = 'update_course_list'
const GET_LESSONLIST = 'get_lesson_list'
const UPDATE_LESSONLIST = 'get_course_list'

export const types = {
    UPDATE_COURSELIST,
    GET_COURSELIST,
    GET_LESSONLIST,
    UPDATE_LESSONLIST
}

//Action creators
const updateCourseList = data => ({
    type: UPDATE_COURSELIST,
    data
});

const getCourseList = () => ({
    type: GET_COURSELIST
})

const updateLessonList= data => ({
    type: UPDATE_LESSONLIST,
    data
});

const getLessonList = () => ({
    type: GET_LESSONLIST
})

export const actions = {
    updateCourseList,
    getCourseList,
    updateLessonList,
    getLessonList
}

const initialState = {
    courses: [],
    lessons: []
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
        default:
            return state;
    }
}

export default reducer