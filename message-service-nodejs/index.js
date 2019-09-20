const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.options('*', cors())

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();

const topic = pubsub.topic('testing');


app.get('/', (req, res) => {
  var timeLimit = req.query.limit;
  if(!timeLimit) {
    timeLimit = new Date(Date.now()-1000*60*60);
  } else {
    timeLimit = new Date(parseInt(timeLimit));
  }
  console.log(timeLimit);
  db.collection('messages').where('timestamp', '>', timeLimit)
  .get()
  .then((snapshot) => {
    var messages = [];
    snapshot.forEach(doc => {
      // messages.push({[doc.id] : doc.data()});
      var data = doc.data();
      data['messageId'] = doc.id;
      messages.push(data);
      console.log(doc.id, '=>', doc.data());
    });

    res.send(messages);
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
});

app.get('/sentiment', (req, res) => {
  var timeLimit = req.query.limit;
  if(!timeLimit) {
    timeLimit = new Date(Date.now()-1000*60*60);
  } else {
    timeLimit = new Date(parseInt(timeLimit));
  }
  console.log(timeLimit);
  db.collection('sentiment').where('timestamp', '>', timeLimit)
  .get()
  .then((snapshot) => {
    var sentiment = [];
    snapshot.forEach(doc => {
      var data = doc.data()
      sentiment.push({[data['messageId']] : data});

      // var data = doc.data();
      // data['messageId'] = doc.id;
      // sentiment[data['messageId']] = data['sentiment'];
      console.log(doc.id, '=>', doc.data());
    });

    res.send(sentiment);
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
});

app.post('/', (req, res) => {
  let docRef = db.collection('messages').doc();

  let setMessage = docRef.set({
    message: req.body.message,
    userName: req.body.userName,
    userId: req.body.userId,
    timestamp: new Date()
  });
  Promise.all([setMessage]);

  // Publishing message
  const data = Buffer.from(JSON.stringify({message: req.body.message, id: docRef.id}));

  const callback = (err, messageId) => {
    if (err) {
      // Error handling omitted.
    }
  };

  topic.publish(data, callback);

  res.status(201).json({ id: docRef.id})
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Message service listening on port', port);
});
