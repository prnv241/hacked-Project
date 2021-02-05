const functions = require("firebase-functions");
const {
  getLessonsInfo,
  getLesson,
  getModule,
  newModule,
  uploadModule,
  checkResults,
  markRead,
  getResult,
} = require("./handlers/lessons");
const { getAssignInfo, getAssgn, getSub, submitSub, uploadSub, getQuizModule, checkResAsgn, getAsgnQuizRes, newAsgn, getquizsub, getsubsub, getStudList, updateMarks } = require("./handlers/assignments");
const { ssignup, llogin } = require("./handlers/users");
const authMiddleware = require("./util/isloggedin");

const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Lessons

app.get("/lessons", authMiddleware, getLessonsInfo);

app.get("/assignments", authMiddleware, getAssignInfo);

app.post("/module/upload", authMiddleware, uploadModule);

app.get("/module/quizes/:ref/result", authMiddleware, getResult);

app.post("/module/quizes/:chapId/:ref", authMiddleware, checkResults);

app.post("/module/new/:chapId", authMiddleware, newModule);

app.post("/assignments/updatemarks", authMiddleware, updateMarks);

app.post("/assignment/new/:asgnId", authMiddleware, newAsgn);

app.get("/lessons/:lessonId", authMiddleware, getLesson);

app.get("/assignments/:assgnId", authMiddleware, getAssgn);

app.get("/module/:type/:chapId/:ref", authMiddleware, getModule);

app.post("/module/:type/:chapId/:ref", authMiddleware, markRead);

app.post("/ssignup", ssignup);

app.post("/login", llogin);

app.get("/written/:asgnId/:subId", authMiddleware, getSub);

app.get("/quiz/:ref/:userId/result", authMiddleware, getAsgnQuizRes);

app.get("/quiz/:asgnId/:ref", authMiddleware, getQuizModule);

app.post("/written/:asgnId/:subId", authMiddleware, submitSub);

app.post("/quiz/:asgnId/:ref", authMiddleware, checkResAsgn);

app.get("/assignments/quiz/submissions/:id", authMiddleware, getquizsub);

app.get("/assignments/sub/submissions/:id", authMiddleware, getsubsub);

app.get("/analysis/studlist", getStudList);

app.post("/written/upload", authMiddleware, uploadSub);

exports.api = functions.https.onRequest(app);
