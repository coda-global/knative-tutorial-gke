# Envrirnment setup
## Container registry setup
Reference: https://cloud.google.com/container-registry/docs/quickstart
```shell
gcloud auth configure-docker
```

## Domain setup
Reference: https://knative.dev/docs/serving/using-a-custom-domain/

By default, Knative Serving routes use `example.com` as the default domain. The
fully qualified domain name for a route by default is
`{route}.{namespace}.{default-domain}`.

### Custom domain setup
Use kubectl apply on the `config-domain.yaml` 

```shell
cd custom-domain
kubectl apply -f config-domain.yaml
```

### Configure the DNS record
Set up wildcard record for the subdomin `default` as the Namespace prefixes the application name
```dns
  *.default.<domain>                   59     IN     A   <Ingress IP address>
  ```