# Setup details
Detailed steps are available in official [Knative site](https://knative.dev/docs/install/knative-with-gke/) Follow the steps in the link for installation

## Installation
### Authorizing gcloud
```
gcloud auth login
```

### Setting Cluster details in environment
```
export CLUSTER_NAME=knative
export CLUSTER_ZONE=us-west1-c
```


### Enable gcloud services
```
gcloud services enable \
     cloudapis.googleapis.com \
     container.googleapis.com \
     containerregistry.googleapis.com
```

### Create cluster
```
gcloud beta container clusters create $CLUSTER_NAME \
  --addons=HorizontalPodAutoscaling,HttpLoadBalancing,Istio \
  --machine-type=n1-standard-4 \
  --cluster-version=latest --zone=$CLUSTER_ZONE \
  --enable-stackdriver-kubernetes --enable-ip-alias \
  --enable-autoscaling --min-nodes=1 --max-nodes=10 \
  --enable-autorepair \
  --scopes cloud-platform
```

### Installing knative
```
kubectl apply --selector knative.dev/crd-install=true \
   --filename https://github.com/knative/serving/releases/download/v0.8.0/serving.yaml \
   --filename https://github.com/knative/eventing/releases/download/v0.8.0/release.yaml \
   --filename https://github.com/knative/serving/releases/download/v0.8.0/monitoring.yaml
```

