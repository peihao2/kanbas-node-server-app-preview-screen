import * as dao from "./quizDao.js";

export default function QuizRoutes(app) {
  // Fetch all quizzes for a course
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    try {
      const quizzes = await dao.findAllQuizzes(req.params.courseId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error finding quizzes:", error);
      res.status(500).json({ message: "Error finding quizzes" });
    }
  });

  // Fetch a single quiz by ID
  app.get("/api/courses/:courseId/quizzes/:quizId", async (req, res) => {
    try {
      const quiz = await dao.findQuizById(req.params.quizId);
      if (!quiz) {
        res.status(404).json({ message: "Quiz not found" });
      } else {
        res.json(quiz);
      }
    } catch (error) {
      console.error("Error finding quiz by ID:", error);
      res.status(500).json({ message: "Error finding quiz by ID" });
    }
  });

  // Create a new quiz
  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    try {
      const quiz = await dao.createQuiz(req.body);
      res.json(quiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ message: "Error creating quiz" });
    }
  });

  // Update a quiz
  app.put("/api/courses/:courseId/quizzes/:quizId", async (req, res) => {
    try {
      const updatedQuiz = await dao.updateQuiz(req.params.quizId, req.body);
      if (!updatedQuiz) {
        res.status(404).json({ message: "Quiz not found" });
      } else {
        res.json(updatedQuiz);
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({ message: "Error updating quiz" });
    }
  });

  // Delete a quiz
  app.delete("/api/courses/:courseId/quizzes/:quizId", async (req, res) => {
    try {
      const status = await dao.deleteQuiz(req.params.quizId);
      if (status) {
        res.status(200).json({ message: "Quiz deleted successfully" });
      } else {
        res.status(404).json({ message: "Quiz not found" });
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.status(500).json({ message: "Error deleting quiz" });
    }
  });

  // Record student answers
  app.post(
    "/api/courses/:courseId/quizzes/:quizId/answers",
    async (req, res) => {
      try {
        const { quizId } = req.params;
        const { studentId, answers } = req.body;

        const updatedQuiz = await dao.recordStudentAnswers(
          quizId,
          studentId,
          answers
        );

        if (!updatedQuiz) {
          res.status(404).json({ message: "Quiz not found" });
        } else {
          res.json(updatedQuiz);
        }
      } catch (error) {
        console.error("Error recording student answers:", error);
        res.status(500).json({ message: "Error recording student answers" });
      }
    }
  );
}
