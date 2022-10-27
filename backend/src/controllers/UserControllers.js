import Controller from "./Controller.js";
import Users from "../models/Users.js";
import UserService from "../services/UserService.js";
import errorHelper from "../helper/errorHelper.js";

const userService = new UserService(new Users().getInstance());

class UserController extends Controller {
  constructor(service) {
    super(service);
    this.login = this.login.bind(this);
    this.findUser = this.findUser.bind(this);
    this.register = this.register.bind(this);
    this.getAllUser = this.getAllUser.bind(this);
  }
  async login(req, res) {
    try {
      let response = await this.service.login(req.body);
      let userId = response.item[0]._id;
      // req.session["user"] = userId._id.toString();
      // req.session.save();
      // console.log(" req.session['user']:", req.session["user"]);
      return response.statusCode < 400
        ? res.status(response.statusCode).send(response)
        : res
            .status(response.statusCode)
            .json(errorHelper(response.statusCode, response.errors));
    } catch (error) {
      const statusCode = error.message.match(/cannot execute/i) ? 400 : 500;
      return res
        .status(statusCode)
        .json(errorHelper(statusCode, error.message || error));
    }
  }
  async findUser(req, res) {
    // console.log("show.........", req.body)
    // return
    try {
      // let userInfo = req.session.user.username;
      // console.log("username:", userInfo);
      let response = await this.service.findUser(req.body);
      return response.statusCode < 400
        ? res.status(response.statusCode).send(response)
        : res
            .status(response.statusCode)
            .json(errorHelper(response.statusCode, response.errors));
    } catch (error) {
      const statusCode = error.message.match(/cannot execute/i) ? 400 : 500;
      return res
        .status(statusCode)
        .json(errorHelper(statusCode, error.message || error));
    }
  }

  async getAllUser(req, res) {
    // console.log("show.........", req.body)
    // return
    try {
      let response = await this.service.getAllUser(req.body);
      return response.statusCode < 400
        ? res.status(response.statusCode).send(response)
        : res
            .status(response.statusCode)
            .json(errorHelper(response.statusCode, response.errors));
    } catch (error) {
      const statusCode = error.message.match(/cannot execute/i) ? 400 : 500;
      return res
        .status(statusCode)
        .json(errorHelper(statusCode, error.message || error));
    }
  }

  async register(req, res) {
    // console.log(req.body)
    // return
    try {
      let response = await this.service.register(req.body);
      return response.statusCode < 400
        ? res.status(response.statusCode).send(response)
        : res
            .status(response.statusCode)
            .json(errorHelper(response.statusCode, response.errors));
    } catch (error) {
      const statusCode = error.message.match(/cannot execute/i) ? 400 : 500;
      return res
        .status(statusCode)
        .json(errorHelper(statusCode, error.message || error));
    }
  }
}

export default new UserController(userService);
