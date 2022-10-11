import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Questions {
    initSchema() {
      const { Schema } = mongoose;
      const schema = new Schema({
        subject: {
            type: Schema.Types.ObjectId,
            ref: "subjects",
            index: true,
        },
        grade: {
          type: Schema.Types.ObjectId,
          ref: "grades",
          index: true,
      },
        title: {
          type: String,
          index: true,
        },
        option: [
        {
          choice: {
            type: String
          },
          content: {
            type: String
        }
        }],
        answer: {
            type: String,
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
      mongoose.model("questions", schema);
    }
  
    getInstance() {
      this.initSchema();
      return mongoose.model("questions");
    }
  }
  
  export default Questions;