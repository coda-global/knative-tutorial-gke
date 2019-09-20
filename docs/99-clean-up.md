# Cleaning up the cluster

# One every root folder + Angular Tekton
kubectl delete -f ./

Removing Google Pub/Sub
kubectl delete --filename https://github.com/knative/eventing-contrib/releases/download/v0.8.0/gcppubsub.yaml

Removing Tekton
kubectl delete -f kubectl apply --filename https://storage.googleapis.com/tekton-releases/latest/release.yaml
