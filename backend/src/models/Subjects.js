import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Subjects {
  initSchema() {
    const { Schema } = mongoose;
    const schema = new Schema({
      title: {
        type: String,
        index: true,
      },
      picture: {
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
    mongoose.model("subjects", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("subjects");
  }
}

export default Subjects;
