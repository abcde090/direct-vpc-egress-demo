# direct-vpc-egress-demo
The direct-vpc-egress-demo repository is a demonstration project designed to showcase how to configure and manage direct VPC (Virtual Private Cloud) egress for Google Cloud Run services. 

## Setup Environment Variables

You can set environment variables that will be used throughout this demo.
```sh
REGION=<YOUR_REGION, e.g. us-central1>
FRONTEND=frontend
BACKEND=backend
```

## Deploy the Backend Cloud Run Service
Navigate to the backend directory.
```sh
cd backend
```
Deploy the Cloud Run service using the following command.
```sh
gcloud run deploy $BACKEND --source . --allow-unauthenticated --region $REGION
```
## Deploy the Frontend Cloud Run Service
Navigate to the frontend directory.
```sh
cd ../frontend
```
Deploy the Cloud Run service using the following command.
```sh
gcloud run deploy $FRONTEND --source . --allow-unauthenticated --region $REGION
```

## Call the Backend Service
Verify that you have successfully deployed two Cloud Run services. Open the URL of the frontend service in your web browser. In the textbox, enter the URL for the backend service. Note that this request is routed from the front end Cloud Run instance to the backend Cloud Run service, instead of being routed from your browser. You will see `hello world`.

## Set the Backend Service for Internal Ingress Only

Run the following gcloud command to only allow traffic from within your VPC network to access your backend service.

```sh
gcloud run services update $BACKEND --ingress internal --region $REGION
```

To confirm that your backend service can only receive traffic from your VPC, try again to call your backend service from your frontend service. This time you will see "Request failed with status code 404". You received this error because the frontend Cloud Run service outbound request (i.e., egress) goes out to the Internet first, so Google Cloud does not know the origin of the request.

## Configure the Frontend Service to Access the VPC

Run this command to enable direct VPC egress:

```sh
gcloud beta run services update $FRONTEND \
--network=default \
--subnet=default \
--vpc-egress=all-traffic \
--region=$REGION
```

Now try again to call your backend service from your frontend service. This time you will see "hello world".


## References:
+ [Google Cloud Codelab](https://codelabs.developers.google.com/codelabs/how-to-configure-cloud-run-service-direct-vpc-egress#0)

+ [Google Cloud Documentation - Direct VPC egress with a VPC network](https://cloud.google.com/run/docs/configuring/vpc-direct-vpc)
