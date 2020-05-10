import HomePage from "../containers/HomePage/HomePage"
import ClassPage from "../containers/ClassPage/ClassPage"
import PDFView from "../containers/PDFView/PDFView"
import CourseSelect from "../containers/CourseSelect/CourseSelect"
import UserInfo from "../containers/UserInfo/UserInfo"


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
}]


export default routes