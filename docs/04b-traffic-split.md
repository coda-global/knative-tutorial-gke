# Knative autoscaling

Reference: https://github.com/meteatamel/knative-tutorial/blob/master/docs/04-trafficsplitting.md

With previous hello-world deployment there will be only one revision available.

Try
```shell
kubectl get revision
```

Let's give a revision name and deploy service_v1.yaml
```shell
cd hello-world-go
kubectl apply -f service_v1.yaml
```
This will route all the traffic to the latest deployment

Deploy service_v2.yaml
```shell
cd hello-world-go
kubectl apply -f service_v2.yaml
```
This has the traffic splitting rules.

Try
```shell
for i in {1..10}; do curl http://helloworld-go.default.gdg.coda.digital; sleep 1; done
```
We should see a mix of v1 and v2
```
Hey there.. v1!
Hey there.. v2!
Hey there.. v1!
Hey there.. v2!
Hey there.. v1!
Hey there.. v1!
Hey there.. v1!
Hey there.. v2!
Hey there.. v1!
Hey there.. v1!
```