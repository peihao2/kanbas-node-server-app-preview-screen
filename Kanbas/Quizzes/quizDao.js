import QuizModel from "./QuizModel.js";

export const createQuiz = async (quiz) => {
  delete quiz._id;
  return await QuizModel.create(quiz);
};

export const findAllQuizzes = async (courseId) => {
  return await QuizModel.find({ courseId }).populate("questions");
};

export const findQuizById = async (quizId) => {
  return await QuizModel.findById(quizId).populate("questions");
};

export const updateQuiz = async (quizId, quiz) => {
  return await QuizModel.findByIdAndUpdate(quizId, quiz, { new: true });
};

export const deleteQuiz = async (quizId) => {
  return await QuizModel.findByIdAndDelete(quizId);
};

export const recordStudentAnswers = async (quizId, studentId, answers) => {
  return await QuizModel.findByIdAndUpdate(
    quizId,
    { $push: { submissions: { studentId, answers } } },
    { new: true }
  );
};
