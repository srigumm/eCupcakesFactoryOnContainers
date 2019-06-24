apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: ecupcakes-packer-deployment
  name: ecupcakes-packer-deployment
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: ecupcakes-packer-deployment
    spec:
      containers:
      - name: packer
        image: gcr.io/GOOGLE_CLOUD_PROJECT/ecupcakes-container-packer:ORDERAPI_DOCKER_VERSION
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
        - name: packer
          containerPort: 5004
