import * as dao from "./questionDao.js";

export default function QuestionRoutes(app) {
  const createQuestion = async (req, res) => {
    const question = await dao.createQuestion(req.body);
    res.json(question);
  };
  app.post("/api/quizzes/:qid/questions", createQuestion);

  const deleteQuestion = async (req, res) => {
    const status = await dao.deleteQuestion(req.params.questionId);
    res.json(status);
  };
  app.delete("/api/questions/:questionId", deleteQuestion);

  const findAllQuestions = async (req, res) => {
    const questions = await dao.findAllQuestions();
    res.json(questions);
  };
  app.get("/api/questions", findAllQuestions);

  const findQuestionById = async (req, res) => {
    const question = await dao.findQuestionById(req.params.questionId);
    res.json(question);
  };
  app.get("/api/questions/:questionId", findQuestionById);

  const findQuestionByQuiz = async (req, res) => {
    const questions = await dao.findQuestionByQuiz(req.params.quiz);
    res.json(questions);
  };
  app.get("/api/quizzes/:quiz/questions", findQuestionByQuiz);

  const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    console.log(questionId);
    console.log(req.body);
    const status = await dao.updateQuestion(questionId, req.body);
    res.json(status);
  };
  app.put("/api/questions/:questionId", updateQuestion);


  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex(
      (a) => a._id === aid);
    db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...req.body
    };
    res.sendStatus(204);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter((a) => a._id !== aid);
    res.sendStatus(200);
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });

  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.json(assignments);
  });
}