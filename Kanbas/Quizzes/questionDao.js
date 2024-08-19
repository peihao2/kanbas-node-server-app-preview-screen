import QuestionModel from "./QuestionModel.js";

export const createQuestion = (question) => {
  delete question._id
  return model.create(question);
}

export const findAllQuestions = () => QuestionModel.find();
export const findQuestionById = (questionId) => QuestionModel.findById(questionId);
export const findQuestionByQuiz = (quizId) => QuestionModel.find({quiz: quizId});
export const findQuestionByCourse = (courseId) => QuestionModel.find({course: courseId});
export const updateQuestion = (questionId, question) => QuestionModel.updateOne({ _id: questionId }, { $set: question });
export const deleteQuestion = (questionId) => QuestionModel.deleteOne({ _id: questionId });