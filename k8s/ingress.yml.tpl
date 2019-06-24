apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ecupcakes-ingress
  annotations:
    kubernetes.io/ingress.global-static-ip-name: ecupcakes-ingress-DEPLOYMENT_ENV
  labels:
    last_updated: "1"
spec:
  rules:
  - host: ecupcakes-orderapi-DEPLOYMENT_ENV.devboston.com
    http:
      paths:
      - path: /*
        backend:
          serviceName: ecupcakes-orderapi-service
          servicePort: 80
