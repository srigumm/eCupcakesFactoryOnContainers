
# Deploying to GKE:

###  prerequisites:
- GCP Account
- docker
- gcloud sdk:

          brew cask install google-cloud-sdk
- kubectl:

          gcloud components install kubectl

### I. Login and create a project
login to Google cloud, create a project, and set it as our active project:
		

		  gcloud auth login
           (or)
          gcloud init

		  gcloud projects create ecupcakes-project

		  gcloud config set project ecupcakes-project

          gcloud config set compute/zone us-central1-b

          gcloud config list

### II: Enable Kubernetes engine API for the above project

          https://console.cloud.google.com/apis/api/container.googleapis.com/overview?project=ecupcakes-project

#### III: Create a cluster

		  gcloud container clusters create ecupcakes-cluster-dev \
      	  --zone us-central1-b \
      	  --enable-autorepair \
      	  --num-nodes 2 \
      	  --enable-autoscaling \
      	  --min-nodes 2 \
      	  --max-nodes 4


      	Example:
      	  - ecupcakes-cluster-dev
   		  - ecupcakes-cluster-stage
   		  - ecupcakes-cluster-prod

## 3: Build your application and push code to github.

## 4: Dockerize your application
create a "Dockerfile" and add instructions to build image.

## 5: Deploy Application Manually:

		Push our docker images to registry:

		  gcloud auth configure-docker
		  
          docker build -t gcr.io/ecupcakes-project/api:v1.0.0 -f src/Api/Dockerfile .

          docker build -t gcr.io/ecupcakes-project/ui:v1.0.0 -f src/React-web-ui/Dockerfile .

		  docker push gcr.io/ecupcakes-project/api:v1.0.0

          docker push gcr.io/ecupcakes-project/ui:v1.0.0

		Prepare the below 3 files under a new "k8" folder:

		  deployment.yml – This will store the information about how to create instances of our container.
		  service.yml – This creates a local domain by which other Kubernetes resources can access instances of our container.
		  ingress.yml – This creates a load balancer that exposes our local service to the internet.


		**Refer github repository for content of these files.

		Execute:

		  kubectl apply -f k8s/


# Cleanup:
 	gcloud container clusters delete ecupcakes-cluster-dev --zone us-central1-b

