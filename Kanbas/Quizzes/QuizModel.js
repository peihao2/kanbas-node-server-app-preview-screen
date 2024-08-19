import mongoose from "mongoose";
import quizSchema from "./quizSchema.js";

const QuizModel = mongoose.model("Quiz", quizSchema);

export default QuizModel;