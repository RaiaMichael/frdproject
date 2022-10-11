import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Grades {
  initSchema() {
    const { Schema } = mongoose;
    const schema = new Schema({
      level: {
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
    mongoose.model("grades", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("grades");
  }
}

export default Grades;
