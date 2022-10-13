import Service from "./Service";
import { ObjectId } from "mongodb";
 

class QuestionService extends Service {
  constructor(model) {
    super(model);
    this.findQuestion = this.findQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }
  async findQuestion(body, populate = [], projection = null) {
    const pipeline = [
      {
        $match: {
          subject: ObjectId(body.subject),
          grade: ObjectId(body.grade),
        },
      },
      {
        $sample: {
          size: 1,
        },
      },
    ];
    try {
      let item = await this.model.aggregate(pipeline);

      if (item)
        return {
          error: false,
          statusCode: 200,
          item,
        };
      else
        return {
          error: true,
          statusCode: 404,
        };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }

  async submitAnswer(body, populate = [], projection = null) {
   
   let correct = false
    const pipeline = [
      {
        $match: {
          _id: ObjectId(body._id)
        },
      },
    ];
    try {

      let item = await this.model.aggregate(pipeline);
      // console.log(item[0].answer)
  
      if (body.answer === item[0].answer) {
        correct = true
      
      }else {
        correct = false
      }
      
      if (item)
        return {
          error: false,
          statusCode: 200,
          item,
          correct
        };
      else
        return {
          error: true,
          statusCode: 404,
        };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }
}

export default QuestionService;
