apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: ecupcakes-baker-deployment
  name: ecupcakes-baker-deployment
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: ecupcakes-baker-deployment
    spec:
      containers:
      - name: baker
        image: gcr.io/GOOGLE_CLOUD_PROJECT/ecupcakes-container-baker:ORDERAPI_DOCKER_VERSION
        env:
        - name: ASPNETCORE_ENVIRONMENT
          value: ORDERAPI_RUNTIME_ENVIRONMENT
        - name: ENV_KAFKA_CLUSTER
          value: _ENV_KAFKA_CLUSTER
        - name: ENV_KAFKA_USER_NAME
          value: _ENV_KAFKA_USER_NAME
        - name: ENV_KAFKA_USER_PASSWORD
          value: _ENV_KAFKA_USER_PASSWORD
        ports:
        - name: baker
          containerPort: 5002
