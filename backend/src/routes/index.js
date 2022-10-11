import Users from '../models/Users.js';
import QuestionRoute from './QuestionRoute.js'
import SubjectRoute from './SubjectRoute.js'
import GradeRoute from './GradeRoute.js'
import UserRoute from './UserRoute.js'

export default (app) => {
    const baseUrl = "/api/v1";

    app.use(`${baseUrl}/question`, QuestionRoute)
    app.use(`${baseUrl}/subject`, SubjectRoute)
    app.use(`${baseUrl}/grade`, GradeRoute)
    app.use(`${baseUrl}/user`, UserRoute)
    
}
