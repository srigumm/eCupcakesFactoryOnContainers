# Continuous Integration and Deployment

Google Cloud Build can be used to run the pipelines.

- Define triggers in google console [here](https://console.cloud.google.com/cloud-build).


## Branching

use a Git Flow variant.

- `feature/*`, `chore/*`: Branched off of `develop`, contains work-in-progress
- `develop`: contains work that is development complete, but not yet accepted by Product Owner
- `master`: work that is completed and has been released / is ready for release.

There is another category of branches that exist in the repo that are used for managing deployments. Inspired by the [GitOps](https://www.weave.works/technologies/gitops/) style of Continuous Delivery.

- `candidate_dev`: Indicates a deployment candidate for the `dev` environment. Any update to this branch triggers a deployment to the `dev` environment
- `dev`: Indicates what is currently deployed to the environment

The above also applies to `candidate_stage` and `stage`, `candidate_prod` and `prod`, etc.

The Git Flow and GitOps workflows interact such that:

1. Any change to a `feature/*` or `chore/*` branch results in a build, which if successful updates the `candidate_dev` branch
2. Any change to the `develop` branch results in a build, which if successful updates the `candidate_stage` branch
3. Any change to the `master` branch results in a build, which if successful updates the `candidate_prod` branch

![branch cloudbuild](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/branch-cloudbuild.png)

![architecture diagram](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/gke-setup.png)

## Useful Links

- [Continuous Delivery Using Google Kubernetes Engine and Google Cloud Build](http://stephenmann.io/post/continuous-delivery-using-google-kubernetes-engine-and-google-cloud-build/#dockerize-our-application)
- [GitOps](https://www.weave.works/technologies/gitops/)
- [GitOps-style continuous delivery with Cloud Build](https://cloud.google.com/kubernetes-engine/docs/tutorials/gitops-cloud-build)
- [Cloud Build Accessing private GitHub repositories](https://cloud.google.com/cloud-build/docs/access-private-github-repos)
