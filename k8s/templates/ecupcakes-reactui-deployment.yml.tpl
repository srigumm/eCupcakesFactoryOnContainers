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
        - name: SERVICE_MIX
          value: _SERVICE_MIX
        - name: SERVICE_BAKE
          value: _SERVICE_BAKE
        - name: SERVICE_DECORATE
          value: _SERVICE_DECORATE
        - name: SERVICE_PACKAGE
          value: _SERVICE_PACKAGE
        ports:
        - name: ecupackesui
          containerPort: 3000
