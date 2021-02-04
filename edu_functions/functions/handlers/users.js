const { db, admin } = require('../util/admin');

exports.ssignup = (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const name = req.body.name;
    const role = req.body.role;
    const rollno = req.body.rollno;
    const newuser = {
        id: id,
        name: name,
        email: email,
        role: role,
        rollno: rollno
    }
    db.doc(`/users/${id}`).create(newuser)
        .then((doc) => {
            console.log('user created');
            res.status(200).json(newuser);
        }).catch((err) => {
            console.log('Error creating new user', err);
            res.status(500).json({ error: err.message });
        })
}

exports.llogin = (req, res) => {
    const localId = req.body.localId;
    db.doc(`/users/${localId}`).get()
        .then(doc => {
            const udata = {
                id: localId,
                name: doc.data().name,
                email: doc.data().email,
                role: doc.data().role,
                rollno: doc.data().rollno,
            }
            res.status(200).json(udata);
        }).catch((err) => {
            console.log('Error getting user data', err);
            res.status(500).json({ error: err.message });
        })
}

