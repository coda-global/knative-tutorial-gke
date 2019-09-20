# Angular UI
Angular with SSR (Server Side Rendering) is used to illustrate the serverless nature of the entire application.

## Build and Deploy application
```shell
cd ui-angular
docker build -t asia.gcr.io/my-knative-project-101/ui-angular:latest .
docker push asia.gcr.io/my-knative-project-101/ui-angular:latest
kubectl apply -f service.yaml
```

Access the application on http://ui.default.gdg.coda.digital

## Next
[Tekton](09-tekton-pipeline.md)