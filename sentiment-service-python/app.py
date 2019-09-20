import base64
import json
import logging
import os
import datetime
import base64
import json

from flask import Flask, request

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

app = Flask(__name__)

# Use the application default credentials
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
  'projectId': 'my-knative-project-101',
})
db = firestore.client()

# @app.route('/', methods=['GET'])
# def get_sentiment():
#     info('GET')
#     time_limit = datetime.datetime.utcnow() - datetime.timedelta(hours=1)
#     sentiment_ref = db.collection(u'sentiment').where(u'timestamp', u'>', time_limit)
#     docs = sentiment_ref.stream()

#     doc_list = []
#     for doc in docs:
#         data = doc.to_dict()
#         doc_list.append({data['messageId'] : data['sentiment']})
#         print(u'{} => {}'.format(doc.id, doc.to_dict()))

#     return json.dumps(doc_list), 200

@app.route('/', methods=['POST'])
def pubsub_push():
    info(base64.b64decode(request.get_json()['Data']))
    data = json.loads(base64.b64decode(request.get_json()['Data']), strict=False)
    info(data)
    message = data['message']
    result = analyze(message)
    info(result.sentences[0])
    doc_ref = db.collection(u'sentiment').document()
    doc_ref.set({
        u'messageId': data['id'],
        u'message': message,
        u'sentiment': result.sentences[0].sentiment.score,
        u'timestamp': datetime.datetime.utcnow()
    })

    return str(result.sentences[0].sentiment.score), 200

def analyze(message):
    client = language.LanguageServiceClient()

    document = types.Document(
        content=message,
        type=enums.Document.Type.PLAIN_TEXT)
    annotations = client.analyze_sentiment(document=document)

    return annotations

def info(msg):
    app.logger.info(msg)


if __name__ != '__main__':
    # Redirect Flask logs to Gunicorn logs
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
else:
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
