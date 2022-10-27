import errorHelper from "../helper/errorHelper.js";
// import XLSX from "xlsx";

class Controller {
  constructor(service) {
    this.service = service;
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.updateOneById = this.updateOneById.bind(this);
  }

  // get ALL by query
  async getAll(req, res) {
    // console.log("show.........", req.body)
    // return
    try {
      let response = await this.service.getAll(req.body);
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

  //get 1 record by ID
  async get(req, res) {
    try {
      let response = await this.service.get(req.params.id);
      return response.statusCode < 400
        ? res.status(response.statusCode).send(response)
        : res
            .status(response.statusCode)
            .json(errorHelper(response.statusCode, response.errors));
    } catch (error) {
      const statusCode = e.message.match(/cannot execute/i) ? 400 : 500;
      return res
        .status(statusCode)
        .json(errorHelper(statusCode, error.message || error));
    }
  }

  //Update 1 record by ID
  async updateOneById(req, res) {
    try {
      let response = await this.service.updateOneById(req.params.id, req.body);

      return response.statusCode < 400
        ? res.status(response.statusCode).send(response)
        : res
            .status(response.statusCode)
            .json(errorHelper(response.statusCode, response.errors));
    } catch (error) {
      const statusCode = e.message.match(/cannot execute/i) ? 400 : 500;
      return res
        .status(statusCode)
        .json(errorHelper(statusCode, error.message || error));
    }
  }

  async insert(req, res) {
    // const excelData = XLSX.readFile("./qa.xlsx");
    // const sheet = Object.keys(excelData.Sheets).map((name) => ({
    //   name,
    //   data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
    // }));

    // sheet[0].data.forEach((item) => {
    //   item.option = [
    //     { choice: "A", content: item["A"] },
    //     { choice: "B", content: item["B"] },
    //     { choice: "C", content: item["C"] },
    //     { choice: "D", content: item["D"] },
    //   ];
    // });

    // console.log(sheet[0].data);

    try {
      let response = await this.service.insert(req.body);

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

export default Controller;
