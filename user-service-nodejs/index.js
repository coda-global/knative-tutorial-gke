const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.options('*', cors())


const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

app.get('/active', (req, res) => {
  db.collection('users').where('timestamp', '>', new Date(Date.now()-1000*60*60))
  .get()
  .then((snapshot) => {
    res.send({ count: snapshot.size });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
});

app.post('/login', (req, res) => {
  let docRef = db.collection('users').doc();

  let setUser = docRef.set({
    name: req.body.name,
    timestamp: new Date()
  });
  Promise.all([setUser]);
  res.status(201).json({ id: docRef.id})
});

app.put('/heart-beat', (req, res) => {
  let docRef = db.collection('users').doc(req.body.id);
  let setUser = docRef.update({
    timestamp: new Date()
  });
  Promise.all([setUser]);
  res.status(200).json({ id: docRef.id})
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('User service listening on port', port);
});
