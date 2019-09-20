# User service and Message service
To demonstrate an end to end application, we have couple of services. For illustration purposes all the APIs are handled as RESTful API calls.

### Setup Google Firestore 
Reference: 
Setting up credential - https://cloud.google.com/firestore/docs/quickstart-servers

Accessing data - https://firebase.google.com/docs/firestore/quickstart


## User service
Simple nodejs service which persists and retrieves User data from Google Firestore.
```
POST /login - A user can login by entering a name
GET /active - Call to view active users
PUT /heart-beat - Updates the last active timestamp
```

### Build and deploy the application
```shell
cd user-service-nodejs
docker build -t asia.gcr.io/my-knative-project-101/user-service-nodejs:latest .
docker push asia.gcr.io/my-knative-project-101/user-service-nodejs:latest
kubectl apply -f service.yaml
```
Verify the application
```curl
curl -X GET \
  http://user-service-nodejs.default.gdg.coda.digital/active
```

## Message service
Simple nodejs service which persists and retrieves Message data from Google Firestore.
```
POST / - Posting a new message
GET /?limit - Call to retrieve messages with time limit as query param. By default it will send last 1hour messages
```

### Build and deploy the application
```shell
cd message-service-nodejs
docker build -t asia.gcr.io/my-knative-project-101/message-service-nodejs:latest .
docker push asia.gcr.io/my-knative-project-101/message-service-nodejs:latest
kubectl apply -f service.yaml
```
Verify the application
```curl
curl -X GET \
  http://message-service-nodejs.default.gdg.coda.digital/
```
