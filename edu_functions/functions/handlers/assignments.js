const { db, admin } = require('../util/admin');
const { v4: uuid } = require('uuid');
const config = require('../util/config');

exports.getAssignInfo = (req, res) => {
  db.collection('assignments').get()
    .then((data) => {
      let assignments = [];
      data.forEach((doc) => {
        assignments.push({
          assgnId: doc.id,
          lessonName: doc.data().metadata.lessonName,
          chaptersCount: doc.data().metadata.chaptersCount,
          videosCount: doc.data().metadata.videosCount,
          quizesCount: doc.data().metadata.quizesCount,
          readingsCount: doc.data().metadata.readingsCount,
          complitedCount: doc.data().metadata.complitedCount,
          complited: doc.data().metadata.complited,
          dueDate: doc.data().metadata.dueDate,
        });
      });
      return res.json(assignments);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

exports.getAssgn = (req, res) => {
  let assignment = {};
  db.doc(`/assignments/${req.params.assgnId}`).get()
    .then((doc) => {
      assignment.metadata = doc.data().metadata;
      assignment.lessonId = doc.id;
      assignment.submissions = doc.data().submissions;
      assignment.quizes = doc.data().quizes;
      assignment.chapId = doc.data().chapId;
      res.status(200).json(assignment);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

exports.getSub = (req, res) => {
  let submission = {};
  db.doc(`/submissions/${req.params.subId}`).get()
    .then((doc) => {
      submission.name = doc.data().name;
      submission.desc = doc.data().desc;
      res.status(200).json(submission);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

exports.checkResAsgn = (req, res) => {
  var asgnId = req.params.asgnId;
  var ref = req.params.ref;
  var results = {};
  db.doc(`/quizes/${ref}`).get()
    .then(doc => {
      var questions = doc.data().questions;
      var answers = doc.data().answers;
      var submitted = req.body.quizAns;
      results.noques = questions.length;
      results.nosub = submitted.length;
      var correct = 0;
      submitted.forEach(sub => {
        let obj = answers.find(o => o.id === sub.id);
        if (obj.answer === sub.ans) {
          correct = correct + 1;
        }
      })
      results.nocurr = correct;
      results.percent = (correct / questions.length) * 100;
      var ress = { ...results, ...req.body.data };
      db.collection('quizSubs').add(ress)
        .then(doc => {
          db.doc(`/assignments/${asgnId}`).get()
            .then(asgn => {
              var dubs;
              dubs = asgn.data().quizes;
              dubs.forEach((quiz) => {
                if (quiz.ref === ref) {
                  quiz.complited.push(req.user.user_id);
                }
              })
              db.doc(`/assignments/${asgnId}`).update({ quizes: dubs });
              return res.json({ success: "Quiz submitted successfully! " });
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ error: err.message });
            });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "something went wrong" });
    });
}

exports.submitSub = (req, res) => {
  const asgnId = req.params.asgnId;
  const subId = req.params.subId;
  var asgnSub = {
    marks: "",
    name: req.body.name,
    studName: req.body.studName,
    rollno: req.body.rollno,
    url: req.body.url,
    time: Date.now(),
    asgnId: asgnId,
    subId: subId,
    userId: req.body.userId
  }
  db.collection('asgnSubs').add(asgnSub)
    .then(doc => {
      var subs;
      db.doc(`/assignments/${asgnId}`).get()
        .then(asgn => {
          subs = asgn.data().submissions;
          subs.forEach((sub) => {
            if (sub.ref === subId) {
              sub.complited.push(req.user.user_id);
            }
          })
          db.doc(`/assignments/${asgnId}`).update({ submissions: subs })
            .then(() => {
              return res.json(subs);
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ error: err.message });
            });
        })
    })
}

exports.uploadSub = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let FileToBeUploaded = {};
  let FileName;
  let generatedToken = uuid();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "application/pdf" && mimetype !== "application/msword") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    const FileExtension = filename.split(".")[filename.split(".").length - 1];
    FileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${FileExtension}`;
    const filepath = path.join(os.tmpdir(), FileName);
    FileToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(FileToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: FileToBeUploaded.mimetype,
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        const FileUri = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${FileName}?alt=media&token=${generatedToken}`;
        return res.json({ fileUrl: FileUri });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
};

exports.getQuizModule = (req, res) => {
  let module = {};
  const asgnId = req.params.asgnId;
  const ref = req.params.ref;
  db.doc(`/assignments/${asgnId}`).get()
    .then(doc => {
      module.chapter = {
        metadata: doc.data().metadata,
        lessonId: doc.id,
        submissions: doc.data().submissions,
        quizes: doc.data().quizes,
        chapId: doc.data().chapId,
      };
      return db.doc(`/quizes/${ref}`);
    })
    .then(body => {
      body.get()
        .then(doc => {
          module.data = doc.data();
          module.data.ref = doc.id;
          module.data.answers = {};
          return res.json(module);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

exports.getAsgnQuizRes = (req, res) => {
  var ref = req.params.ref;
  var userId = req.params.userId;
  let result;
  db.collection('quizSubs').where("userId", "==", userId).where("quizId", "==", ref).get()
    .then((doc) => {
      result = doc.data();
      return res.json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.message });
    });
}

exports.newAsgn = (req, res) => {
  var asgnId = req.params.asgnId;
  var newAsgn = req.body.asgndata;
  db.collection('submissions').add(newAsgn)
    .then(data => {
      db.doc(`/assignments/${asgnId}`).get()
        .then(doc => {
          var temp = doc.data().submissions;
          var newsub = {
            name: newAsgn.name,
            complited: [],
            ref: data.id,
            time: newAsgn.time
          }
          temp.push(newsub);
          db.doc(`/assignments/${asgnId}`).update({ submissions: temp })
            .then(rec => {
              console.log("Assignment Added!");
              return res.status(200).json(temp);
            })
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.message });
    });
}