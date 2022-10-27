import Controller from "./Controller.js";
import Grades from "../models/Grades.js"
import GradeService from "../services/GradeService.js";

const gradeService = new GradeService(new Grades().getInstance())

class GradeController extends Controller {
    constructor(service) {
        super(service)
    }
}

export default new GradeController(gradeService)