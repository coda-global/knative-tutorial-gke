# Knative autoscaling

Reference: 
https://knative.dev/docs/serving/configuring-the-autoscaler/

https://knative.dev/docs/serving/samples/autoscale-go/index.html


Install sample application
```shell
cd auto-scaling
kubectl apply -f service.yaml
```

Try accessing this URL to verify simulated delay
http://autoscale-go.default.gdg.coda.digital/?sleep=100&prime=10000&bloat=50

Run a simple simple load test using
```shell
    hey -z 30s -c 50 \
     "http://autoscale-go.default.gdg.coda.digital/?sleep=100&prime=10000&bloat=50"
```
Watch the Pods scaling up and down automatically
```shell
watch -n 1 "kubectl get po"
```

## Next
[Splitting traffic](04b-traffic-split.md)
