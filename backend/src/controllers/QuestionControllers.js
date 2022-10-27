import Controller from "./Controller.js";
import Questions from "../models/Questions.js";
import QuestionService from "../services/QuestionService.js";
import errorHelper from "../helper/errorHelper.js";
import SubjectController from "./SubjectControllers.js";
import UserControllers from "./UserControllers.js";
import { ObjectId } from "mongodb";

const questionService = new QuestionService(new Questions().getInstance());

class QuestionController extends Controller {
  constructor(service) {
    super(service);
    this.findQuestion = this.findQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async findQuestion(req, res) {
    // console.log('---------',req.body)
    try {
      
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
    // console.log(req.session["user"])
    let chineseCounter = 0;
    let englishCounter = 0;
    let mathCounter = 0;
    let commonCounter = 0;

    try {
      let response = await this.service.submitAnswer(req.body);
      let subject = await SubjectController.service.model.find({
        _id: ObjectId(response.item[0].subject),
      });

      let user = await UserControllers.service.model.find({
        // _id: req.session["user"]
        _id: ObjectId(req.body.user),
      });
      

      if (response.correct === true) {
        if (subject[0].title === "中文") {
          chineseCounter = user[0].chineseMarks + 10;
          await UserControllers.service.model.update(
            {
              _id: ObjectId(req.body.user)
            },
            { chineseMarks: chineseCounter }
          );
        } else if (subject[0].title === "英文") {
          englishCounter = user[0].englishMarks + 10;
          await UserControllers.service.model.update(
            {
              _id: ObjectId(req.body.user)
            },
            { englishMarks: englishCounter }
            );
        } else if (subject[0].title === "數學") {
          mathCounter = user[0].mathMarks + 10;
          await UserControllers.service.model.update(
            {
              _id: ObjectId(req.body.user)
            },
            { mathMarks: mathCounter }
            );
        } else if (subject[0].title === "常識") {
          commonCounter = user[0].commonMarks + 10;
          await UserControllers.service.model.update(
            {
              _id: ObjectId(req.body.user)
            },
            { commonMarks: commonCounter }
            );
        }
      }
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
