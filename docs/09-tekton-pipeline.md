# Tekton Pipeline
Reference: https://github.com/tektoncd/pipeline

## Install Tekton
Reference: https://github.com/tektoncd/pipeline/blob/master/docs/install.md
```shell
kubectl apply --filename https://storage.googleapis.com/tekton-releases/latest/release.yaml
```

## Build Angular App with Tekton
```shell
cd ui-angular

# Adding GIT relate resource information
kubectl apply -f tekton/git-resource.yaml 

# Adding docker related resource information
kubectl apply -f tekton/docker-image-resource.yaml

# Adding Build task
kubectl apply -f tekton/build-docker-image-task.yaml

# Invoking build
kubectl apply -f tekton/build-docker-image-taskrun.yaml
```

Check out deploy-app-task in the source code. And try out Pipelines in Tekton.