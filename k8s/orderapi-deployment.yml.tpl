apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: ecupcakes-orderapi-deployment
  name: ecupcakes-orderapi-deployment
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: ecupcakes-orderapi-deployment
    spec:
      containers:
      - name: orderapi
        image: gcr.io/GOOGLE_CLOUD_PROJECT/ecupcakes-container-orderapi:ORDERAPI_DOCKER_VERSION
        env:
        - name: ASPNETCORE_ENVIRONMENT
          value: ORDERAPI_RUNTIME_ENVIRONMENT
        ports:
        - name: orderapi
          containerPort: 5000
