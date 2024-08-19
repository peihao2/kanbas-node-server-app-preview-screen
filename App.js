import "dotenv/config";
import express from 'express';
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import session from "express-session";

// import quiz and question routes
import QuizRoutes from "./Kanbas/Quizzes/quizRoutes.js";
import QuestionRoutes from './Kanbas/Quizzes/questionRoutes.js'


const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || 'mongodb+srv://Cluster64492:XWNCRFBjZHlx@cluster64492.orn2x.mongodb.net/kanbas';
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
      })
    );

    const sessionOptions = {
        secret: process.env.SESSION_SECRET || "kanbas",
        resave: false,
        saveUninitialized: false,
      };
      if (process.env.NODE_ENV !== "development") {
        sessionOptions.proxy = true;
        sessionOptions.cookie = {
          sameSite: "none",
          secure: true,
          domain: process.env.NODE_SERVER_DOMAIN,
        };
      }
      app.use(session(sessionOptions));
      
      
app.use(express.json()); 


UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
Hello(app);
Lab5(app);
AssignmentRoutes(app);

// add quiz and question routes
QuizRoutes(app);
QuestionRoutes(app);

app.listen(4000);
const port = process.env.PORT || 4000;