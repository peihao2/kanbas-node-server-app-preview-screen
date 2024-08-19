import mongoose from "mongoose";
import questionSchema from "./questionSchema.js";

const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;