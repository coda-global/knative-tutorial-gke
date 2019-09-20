# Hello world in Knative
Reference: https://knative.dev/docs/serving/getting-started-knative-app/

## Steps
Building the image and tagging with appropriate 
```shell
cd hello-world-go
docker build -t asia.gcr.io/my-knative-project-101/hello-world-knative:latest .
```

Pushing the image to registry
```shell
docker push asia.gcr.io/my-knative-project-101/hello-world-knative:latest
```

Deploying the application
```shell
kubectl apply -f service.yaml
```

Get the application route
```shell
kubectl get routes
```

## Next
[Scaling](04a-scaling.md)