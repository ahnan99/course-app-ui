import HomePage from "../containers/HomePage/HomePage"
import ClassPage from "../containers/ClassPage/ClassPage"
import PDFView from "../containers/PDFView/PDFView"
import CourseSelect from "../containers/CourseSelect/CourseSelect"
import UserInfo from "../containers/UserInfo/UserInfo"
import FeedbackPage from '../containers/FeedbackPage/FeedbackPage'
import MessagePage from '../containers/MessagePage/MessagePage'
import CertPage from '../containers/CertPage/CertPage'
import HelpPage from '../containers/HelpPage/HelpPage'
import ExamPage from '../containers/ExamPage/ExamPage'
import AuditPage from '../containers/Audit/AuditPage'
import CertList from '../containers/Audit/CertList'
import CertImage from '../containers/Audit/CertImage'
import CertImageStudent from "../containers/CertPage/CertImageStudent"
import ClassCommentPage from "../containers/ClassPage/ClassCommentPage"
import InvoicePage from "../containers/InvoicePage/InvoicePage"

const routes = [{
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
},
{
    path: '/certpage',
    pathKey: 'certpage',
    component: CertPage
},
{
    path: '/invoicepage',
    pathKey: 'invoicepage',
    component: InvoicePage

},
{
    path: '/helppage',
    pathKey: 'helppage',
    component: HelpPage
},
{
    path: '/exampage',
    pathKey: 'exampage',
    component: ExamPage
},
{
    path: '/auditpage',
    pathKey: 'auditpage',
    component: AuditPage

},
{
    path: '/auditpage/certlist',
    pathKey: 'auditcertlist',
    component: CertList

},
{
    path: '/auditpage/certlist/certimage',
    pathKey: 'certimage',
    component: CertImage
},
{
    path: '/certpage/certimage',
    pathKey: 'certimagestudent',
    component: CertImageStudent
},
{
    path: '/classcommentpage',
    pathKey: 'classcommentpage',
    component: ClassCommentPage
}]


export default routes