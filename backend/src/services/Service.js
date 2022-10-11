class Service {
    constructor(model) {
      this.model = model;
  
      this.get = this.get.bind(this);
      this.getAll = this.getAll.bind(this);
      this.updateOneById = this.updateOneById.bind(this);
      this.insert = this.insert.bind(this);
    }
  
    //get 1 record by ID
    async get(id, populate = [], projection = null) {
      try {
        let item = await this.model.findById(id, projection);
  
        if (populate.length !== 0) await item.populate(populate);
  
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
  
    //Update 1 record by ID
    async updateOneById(id, updateData, populate = [], projection = null) {
      try {
        let item = await this.model.findByIdAndUpdate(
          id,
          { ...updateData, updatedAt: Date.now() },
          { new: true },
          projection
        );
  
        // if (populate.length !== 0) await item.populate(populate);
  
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
  
    // get ALL by query
    async getAll(body, populate = [], select = null, noLimit = false) {
      let searchText = new RegExp(`${body.query}`, "i");
      let { page, limit, sortBy, orderBy } = body;
      let sort = {};
      let items;
  
      page = page ? Number(page) : 1;
      limit = limit ? Number(limit) : Number(process.env.DEFAULT_NO_PER_PAGE);
      if (!noLimit)
        limit =
          limit > Number(process.env.MAX_NO_PER_PAGE)
            ? Number(process.env.MAX_NO_PER_PAGE)
            : limit;
  
      delete body.page;
      delete body.limit;
      delete body.sort_by;
      delete body.order_by;
  
      if (sortBy && orderBy) {
        sort[sortBy] = orderBy === "desc" ? -1 : 1;
      } else {
        sort[sortBy] = 1;
      }
  
      try {
        if (body.query) {
          items = await this.model
            .find({ email: { $regex: searchText } })
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);
  
          if (items.length === 0) {
            items = await this.model
              .find({ displayName: { $regex: searchText } })
              .sort(sort)
              .skip((page - 1) * limit)
              .limit(limit);
          }
  
          const total = items.length;
          const currentPage = page;
          const totalPage = total == 0 ? 1 : Math.ceil(total / limit);
          const nextPage = page == totalPage ? null : page + 1;
          const prevPage = page == 1 ? null : page - 1;
  
          return {
            error: false,
            statusCode: 200,
            data: items,
            total,
            totalPage,
            currentPage,
            nextPage,
            prevPage,
          };
        } else {
          items = await this.model
            .find(body)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);
  
          await Promise.all(
            items.map(async (item) => {
              await item.populate(populate);
            })
          );
          if (select) {
            items = await this.model
              .find(body)
              .select(select)
              .sort(sort)
              .skip((page - 1) * limit)
              .limit(limit);
          }
  
          const total = await this.model.countDocuments(body);
          const currentPage = page;
          const totalPage = total == 0 ? 1 : Math.ceil(total / limit);
          const nextPage = page == totalPage ? null : page + 1;
          const prevPage = page == 1 ? null : page - 1;
  
          return {
            error: false,
            statusCode: 200,
            data: items,
            total,
            totalPage,
            currentPage,
            nextPage,
            prevPage,
          };
        }
      } catch (errors) {
        console.log(errors);
        return {
          error: true,
          statusCode: 500,
          errors,
        };
      }
    }
  
    async insert(data) {
      try {
        let item = await this.model.create(data);
        if (item)
          return {
            error: false,
            statusCode: 200,
            item,
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
  
  export default Service;