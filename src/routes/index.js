import HomePage from "../containers/HomePage/HomePage"
import ClassPage from "../containers/ClassPage/ClassPage"
import PDFView from "../containers/PDFView/PDFView"
import CourseSelect from "../containers/CourseSelect/CourseSelect"
import UserInfo from "../containers/UserInfo/UserInfo"
import FeedbackPage from '../containers/FeedbackPage/FeedbackPage'
import MessagePage from '../containers/MessagePage/MessagePage'


const routes =[{
    path: '/homepage',
    pathKey: 'homepage',
    component: HomePage
},
{
    path: '/classpage',
    pathKey: 'classpage',
    component: ClassPage
},
{
    path: '/classpage/pdfview',
    pathKey: 'pdfview',
    component: PDFView
},
{
    path: '/courseselect',
    pathKey: 'courseselect',
    component: CourseSelect
},
{
    path: '/userinfo',
    pathKey: 'userinfo',
    component: UserInfo
},
{
    path: '/feedbackpage',
    pathKey: 'feedbackpage',
    component: FeedbackPage
},
{
    path: '/messagepage',
    pathKey: 'messagepage',
    component: MessagePage
}]


export default routes