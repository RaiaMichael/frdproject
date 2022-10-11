import Controller from "./Controller";
import Questions from "../models/Questions.js";
import QuestionService from "../services/QuestionService.js";
import errorHelper from "../helper/errorHelper";

const questionService = new QuestionService(new Questions().getInstance());

class QuestionController extends Controller {
  constructor(service) {
    super(service);
    this.findQuestion = this.findQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async findQuestion(req, res) {
    // console.log("...........",req.body)
    // return
    try {
      console.log("item---");
      let response = await this.service.findQuestion(req.body);

      if (response.error)
        return response.statusCode < 400
          ? res.status(response.statusCode).send(response)
          : res
              .status(response.statusCode)
              .json(errorHelper(response.statusCode, response.error));
      return res.status(201).send(response);
    } catch (error) {
      const statusCode = error.message.match(/cannot execute/i) ? 400 : 500;
      return res
        .status(statusCode)
        .json(errorHelper(statusCode, error.message || error));
    }
  }

  async submitAnswer(req, res) {
    // console.log("show answer",req.body)
    try {
      let response = await this.service.submitAnswer(req.body);
      
      if (response.error)
        return response.statusCode < 400
          ? res.status(response.statusCode).send(response)
          : res
              .status(response.statusCode)
              .json(errorHelper(response.statusCode, response.error));
      return res.status(201).send(response);
    } catch (error) {
      const statusCode = error.message.match(/cannot execute/i) ? 400 : 500;
      return res
        .status(statusCode)
        .json(errorHelper(statusCode, error.message || error));
    }
  }
}

export default new QuestionController(questionService);
