import Controller from "./Controller.js";
import Subjects from "../models/Subjects.js"
import SubjectService from "../services/SubjectService.js";

const subjectService = new SubjectService(new Subjects().getInstance()); 

class SubjectController extends Controller {
    constructor(service) {
        super(service)
    }
}

export default new SubjectController(subjectService)