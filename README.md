# Webhook project

This project was created as to simulate a PBX and listen all the events into the webhook. Besides, we can see all the events into the Dashboard (react.js).

## 1 Table of contents
- [1 Table of contents](#1-table-of-contents)
- [2 Summary](#2-summary)
- [3 Mandatory requirements before installing the containers](#3-mandatory-requirements-before-installing-the-containers)
- [4 Installation](#4-installation)
    - [4.1 First-step-docker-compose](#41-first-step-docker-compose)
    - [4.2 Second-step-frontend-dashboard](#42-second-step-frontend-dashboard)

## 2 Summary
- The project was divided into 3 modules: backend, mock-pbx and frontend. 

- Each module is a microservice that was created through containers (docker). 

- Each container has its responsibility. 

- The mock-pbx microservice was created to simulate the 
pbx events in a call via API. 

- The backend was created to automate the flow of call (receptive) calls through integrations with the mock-pbx by [Webhook](https://pt.wikipedia.org/wiki/Webhook). 
This container also provides APIs for the frontend (Dashboard). 

- The frontend container was created to show metrics for telephony calls through a dashboard. 

- We'll also use an extra container for the database. I'm using the [MongoDB](https://www.mongodb.com/) to save some information from the containers: mock-pbx and backend. The goal is to show this data into the frontend.

## 3 Mandatory requirements before installing the containers

We are using containers to run the application. 

In this case first install the docker. 

The link on the side shows how to dock the installation correctly according to the OS on your machine. [Follow step by step of docker official installation](https://docs.docker.com/install/). 

After that make sure the docker has been installed correctly and enter the command below:

```bash
$ docker version
```

If the docker version information appears like below, your installation was done successfully.

```bash
Client:
 Version:	17.12.0-ce
 API version:	1.35
 Go version:	go1.9.2
 Git commit:	c97c6d6
 Built:	Wed Dec 27 20:03:51 2017
 OS/Arch:	darwin/amd64

Server:
 Engine:
  Version:	17.12.0-ce
  API version:	1.35 (minimum version 1.12)
  Go version:	go1.9.2
  Git commit:	c97c6d6
  Built:	Wed Dec 27 20:12:29 2017
  OS/Arch:	linux/amd64
  Experimental:	true
```

Otherwise check the [docker documentation again](https://docs.docker.com/install/) and redo the installation correctly.


## 4 Installation

To run the application follow these steps:

### 4.1 First-step-docker-compose

To perform the mongo, backend and mock-pbx containers I am using the docker-compose as to orchestrate all services.

**PS: I had a problem running the frontend container with the docker compose. So, this microservice was out of the docker-compose. In order to run the dashboard please follow the step -> (4.2 Second-step-frontend-dashboard).**

In order to perform the docker compose follow these steps below:

Go to the root.
```bash
cd webhook-pabx-project/
```

Then, you need to build. It will create the images of the containers.

```bash
docker-compose build
```

Finally, as long as all the images was uploaded, run the following command to up the mongo, backend and mock-pbx containers.

```bash
docker-compose up -d
```

Done!!! All the microservices are executing in the background and running the services with the ports: 
- 27017 -> http://localhost:27017 (mongo)
- 3000 -> http://localhost:3000 (backend)
- 3001 -> http://localhost:3001 (mock-pbx)


### 4.2 Second-step-frontend-dashboard

Run the frontend project as to deploy the dashboard container. For more information about the project go to the next link. [Follow a step by step of frontend dashboard](https://bitbucket.org/squademc/challenge/src/dbea01f77cb29e23fb026bb117c72381813ed1e1/3-Write%20a%20client%20for%20Teravoz%20API/frontend/?at=master)

 