import Service from "./Service";
import { ObjectId } from "mongodb";

class UserService extends Service {
  constructor(model) {
    super(model);
    this.login = this.login.bind(this);
  }
  async login(body, populate = [], projection = null) {
    console.log(body);
    try {
      let item = await this.model.find({
        username: body.name,
        password: body.password,
      });
      // console.log(item)
      // return
      if (item.length !== 0) {
        return {
          error: false,
          statusCode: 200,
          item,
        };
      } else if(item.length === 0) {
        return {
          error: false,
          statusCode: 408,
          item,
        };
      }
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }
}

export default UserService;
