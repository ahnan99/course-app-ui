import HomePage from "../containers/HomePage/HomePage"
import ClassPage from "../containers/ClassPage/ClassPage"
import PDFView from "../containers/PDFView/PDFView"


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
}]


export default routes