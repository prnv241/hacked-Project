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
const { getAssignInfo, getAssgn, getSub, submitSub, uploadSub, getQuizModule, checkResAsgn, getAsgnQuizRes, newAsgn } = require("./handlers/assignments");
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

app.get("/lessons", getLessonsInfo);

app.get("/assignments", getAssignInfo);

app.post("/module/upload", uploadModule);

app.get("/module/quizes/:ref/result", getResult);

app.post("/module/quizes/:chapId/:ref", checkResults);

app.post("/module/new/:chapId", newModule);

app.post("/assignment/new/:asgnId", newAsgn);

app.get("/lessons/:lessonId", getLesson);

app.get("/assignments/:assgnId", getAssgn);

app.get("/module/:type/:chapId/:ref", getModule);

app.post("/module/:type/:chapId/:ref", markRead);

app.post("/ssignup", ssignup);

app.post("/login", llogin);

app.get("/written/:asgnId/:subId", getSub);

app.get("/quiz/:ref/:userId/result", getAsgnQuizRes);

app.get("/quiz/:asgnId/:ref", getQuizModule);

app.post("/written/:asgnId/:subId", submitSub);

app.post("/quiz/:asgnId/:ref", checkResAsgn);

app.post("/written/upload", uploadSub);

exports.api = functions.https.onRequest(app);
