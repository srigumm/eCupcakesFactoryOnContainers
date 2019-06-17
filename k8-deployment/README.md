
# CI/CD using Google Cloud Build and Kubernetees Engine:

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

## 6: Adding Google Cloud Build Instructions

		  Create a file in the root of your repository named cloudbuild.yaml and put the following contents into it:

			steps:
			- name: 'gcr.io/cloud-builders/docker'
			  args: ['build', '-t', 'gcr.io/$PROJECT_ID/hello-world:1.0.$BUILD_ID', '.']
			  timeout: 180s
			- name: 'gcr.io/cloud-builders/docker'
			  args: ['push', 'gcr.io/$PROJECT_ID/hello-world:1.0.$BUILD_ID']
			- name: 'gcr.io/cloud-builders/kubectl'
			  args:
			  - set
			  - image
			  - deployment
			  - hello-world
			  - web=gcr.io/$PROJECT_ID/hello-world:1.0.$BUILD_ID
			  env:
			  - 'CLOUDSDK_COMPUTE_ZONE=us-central1-b'
			  - 'CLOUDSDK_CONTAINER_CLUSTER=cloud-build-example'

## 7: Enable google cloud build

	By default, Cloud Build is disabled. You will need to enable it by navigating to the “APIs & Services” subsection of your Cloud Console.
	Once you do that, Cloud Build is enabled, but it cannot access your Kubernetes cluster. You’ll need to give it access. Do this by:

		Open your Cloud Console to the “IAM & admin” subsection.
		Click the “IAM” section.
		Click the pencil icon next to the user named “######@cloudbuild.gserviceaccount.com”.
		Select “Add New Role”.
		Find “Kubernetes Engine Admin” and add it.
		Click “Save”.


## 8: Adding a Build Trigger
		This is the last step!

		Navigate to the Cloud Console -> Cloud Build -> Build Triggers section.
		Click “Create trigger”.
		Click “GitHub”.
		Click “Continue”.
		Grant Cloud Build access to GitHub.
		Select your repository; read and then accept the license agreement.
		Type the following into the “Branch (regex)” field: ^master$
		Under “Build configuration,” select “cloudbuild.yaml”
		Click “Create trigger”

#3 Under workloads, create a deployment

	- foresight-graphql-deployment	
	- foresight-web-deployment	
	
#4 Create Service/Load Balancer

    - NodePort
    - Ingress
    - LoadBalancer

    foresight-graphql-service
    foresight-graphql-service-lb	
    foresight-ingress

 #5 Cloud Build:

     brew cask install google-cloud-sdk

     - Create a “Build Trigger”, which tells Cloud Build which repository to watch for changes. Whenever you push a tag or push a branch, Cloud Build pulls the source, looks for a “cloudbuild.yaml” file in the root, and then follows the instructions in that file to run a deployment.

     - "Cloud Builders" : built-in Cloud Builders here: https://github.com/GoogleCloudPlatform/cloud-builders.

# Cleanup:
 	gcloud container clusters delete ecupcakes-cluster-dev --zone us-central1-b

