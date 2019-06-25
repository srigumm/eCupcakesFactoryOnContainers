apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: ecupcakes-ecupcakesui-deployment
  name: ecupcakes-ecupcakesui-deployment
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: ecupcakes-ecupackesui-deployment
    spec:
      containers:
      - name: orderapi
        image: gcr.io/GOOGLE_CLOUD_PROJECT/ecupcakes-container-ecupcakesui:ORDERAPI_DOCKER_VERSION
        env:
        - name: ASPNETCORE_ENVIRONMENT
          value: ORDERAPI_RUNTIME_ENVIRONMENT
        ports:
        - name: ecupackesui
          containerPort: 3000
