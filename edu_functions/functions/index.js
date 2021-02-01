const functions = require('firebase-functions');
const { getLessonsInfo, getLesson, getModule, newModule, uploadModule, checkResults, markRead, getResult } = require('./handlers/lessons');
const { getAssignInfo, getAssgn } = require('./handlers/assignments');
const { ssignup, llogin } = require('./handlers/users');
const authMiddleware = require('./util/isloggedin');

const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Lessons 

app.get('/lessons', authMiddleware, getLessonsInfo);

app.get('/assignments', authMiddleware, getAssignInfo);

app.post('/module/upload', authMiddleware, uploadModule);

app.get('/module/quizes/:ref/result', authMiddleware, getResult);

app.post('/module/quizes/:chapId/:ref', authMiddleware, checkResults);

app.post('/module/new/:chapId', authMiddleware, newModule);

app.get('/lessons/:lessonId', authMiddleware, getLesson);

app.get('/assignments/:assgnId', authMiddleware, getAssgn);

app.get('/module/:type/:chapId/:ref', authMiddleware, getModule);

app.post('/module/:type/:chapId/:ref', authMiddleware, markRead);

app.post('/ssignup', ssignup);

app.post('/login', llogin);

exports.api = functions.https.onRequest(app);