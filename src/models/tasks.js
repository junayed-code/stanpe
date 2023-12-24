import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "to-do",
    },
  },
  { timestamps: true }
);

mongoose.models = {};

const Tasks = model("Tasks", schema);

export default Tasks;
