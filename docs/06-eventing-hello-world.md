# Eventing Hello world
Reference: https://knative.dev/docs/eventing/samples/cronjob-source/


## Enable eventing on namespace
Reference: https://knative.dev/docs/eventing/getting-started/
Note: This step is needed to enable evening in the namespace
```shell
kubectl label namespace default knative-eventing-injection=enabled
```

## Cron job sources
Install the Cronjob source and the service to be invoked
```shell
cd eventing-hello-world
kubectl apply -f ./ && kubectl get po -w
```

Check the logs
```shell
kubectl logs -l serving.knative.dev/service=event-display -c user-container --since=10m
# or
kubectl logs -f event-display-<deployment-suffix> -c user-container
```


## Pub/Sub source
### Enable Google Pub/Sub
Reference: https://knative.dev/docs/eventing/samples/gcp-pubsub-source/

```shell
gcloud services enable pubsub.googleapis.com

kubectl apply --filename https://github.com/knative/eventing-contrib/releases/download/v0.8.0/gcppubsub.yaml

# Creating Google Pub/Sub source
kubectl apply -f gcppubsub-source.yaml

kubectl delete -f ./

kubectl apply -f event-display-service.yaml
kubectl apply -f gcp-trigger.yaml
gcloud pubsub topics publish testing --message="Hello world from GCP pub/sub"
```

## Next
[Sentiment Analysis service](07-sentiment-service-and-pubsub.md)
