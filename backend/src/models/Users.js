import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Users {
    initSchema() {
      const { Schema } = mongoose;
      const schema = new Schema({
        username: {
          type: String,
          index: true,
        },
        password: {
          type: String,
          index: true,
        },
        grade: {
            type: Schema.Types.ObjectId,
            ref: "grades",
            index: true,
        },
        chineseMarks: {
          type: Number,
          index: true,
        },
        englishMarks: {
            type: Number,
            index: true,
          },
        mathMarks: {
            type: Number,
            index: true,
          },
        commonMarks: {
            type: Number,
            index: true,
          },
        createdAt: {
          type: Schema.Types.Date,
          default: Date.now,
          index: true,
        },
        updatedAt: {
          type: Schema.Types.Date,
          default: Date.now,
        },
        isDeleted: {
          type: Boolean,
          default: false,
          index: true,
        },
        deletedAt: {
          type: Schema.Types.Date,
        },
      });
      schema.plugin(uniqueValidator);
      mongoose.model("users", schema);
    }
  
    getInstance() {
      this.initSchema();
      return mongoose.model("users");
    }
  }
  
  export default Users;