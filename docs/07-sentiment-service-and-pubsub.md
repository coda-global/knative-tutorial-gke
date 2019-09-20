# Sentiment Analysis service
This is a Python based service which talks to Google sentiment analysis service to retrive the sentiment of the message posted. The response is store in Google Firestore.

## Deploy sentiment analysis service
```shell
cd sentiment-service-python
kubectl apply -f service.yaml
```

POST message for getting the sentiment score
```curl
curl -X POST \
  http://sentiment-analysis-service.default.gdg.coda.digital/ \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
	"Data" : "eyJtZXNzYWdlIjogIlRoaXMgaXMgZmFudGFzdGljLi4iLCJpZCI6IngifQo="
}'
```
The response shows the sentiment score.

Note: The service expects Data in base64 format
```shell
$ echo ""{\"message\": \"This is fantastic..\",\"id\":\"x\"}"" | base64
$ eyJtZXNzYWdlIjogIlRoaXMgaXMgZmFudGFzdGljLi4iLCJpZCI6IngifQo=
```

## Adding Pub/Sub trigger

```shell
kubectl apply trigger.yaml
```

Now publish message on to the `testing` topic
```shell
gcloud pubsub topics publish testing --message="{\"message\": \"This is fantastic..\",\"id\":\"x\"}"
```
