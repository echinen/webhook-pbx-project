# backend container

This project was created as to simulate a webhook and consume the PBX API (mock-pbx). Besides, it will provide data via API to the front end (dashboard). Through a public API Webhook we can receive the events of a call in real time and save into the database.

## 1 Table of contents
- [1 Table of contents](#1-table-of-contents)
- [2 Installation](#2-installation)
- [3 Folder structure](#3-folder-structure)
- [4 Listening to the flow of events by webhook](#4-listening-to-the-flow-of-events-by-webhook)
    - [4.1 First event call new](#41-first-event-call-new)
    - [4.2 Second event call standby](#42-second-event-call-standby)
    - [4.3 Third event call waiting](#43-third-event-call-waiting)
    - [4.4 Fourth event actor entered](#44-fourth-event-actor-entered)
    - [4.5 Fifth event call ongoing](#45-fifth-event-call-ongoing)
    - [4.6 Sixth event actor left](#46-sixth-event-actor-left)
    - [4.7 Seventh event call finished](#47-seventh-event-call-finished)
- [5 Sending data to update the dashboard](#5-sending-data-to-update-the-dashboard)
- [6 Development environment and track logs](#6-development-environment-and-track-logs)
- [7 Library/Framework](#7-libraryframework)

## 2 Installation

The installation was previously done through the docker-compose which make it easier to deploy the application.


The container **backend** will run in background in the following url -> http://localhost:3000

## 3 Folder structure
```sh
.
└── ./src  
    ├── config                # config to set up
    ├── handlers              # handlers module
    ├── middlewares           # middlewares module
    ├── models                # models module
    ├── repositories          # repositories module
    ├── routers               # routers module
    ├── services              # services module
```

## 4 Listening to the flow of events by webhook

The webhook API -> (POST)
http://localhost:3000/api/client/webhook was signed in PBX API (mock-pbx) in order to receive all the events of a call.

Therefore, this API will listen to all the events which PBX API will provide.

Example sending payload:

```js
{
    "chamada": {
        "call_id": "0bc692b0-128a-11e8-807b-e3acc2b0c13d",
        "code": "",
        "type": "call.new",
        "direction": "inbound",
        "our_number": "0800111111",
        "their_number": "1199999999",
        "timestamp": "2018-02-15T20:07:32.562Z"
    },
    "dados": {
        "call_id": "0bc692b0-128a-11e8-807b-e3acc2b0c13d",
        "type": "call.cpf-provided",
        "cpf": "",
        "timestamp": "2018-02-15T20:07:32.562Z"
    },
    "atendente": {},
    "dialer": {}
}
```

After receiving a notification of a call, the webhook will receive each event according to each event below:

### 4.1 First-event-call-new
When the webhook receives the call.new notification:

    1 - Get the payload sent.
    2 - Save the payload with the data of a call in the database (call.new).

### 4.2 Second-event-call-standby
When the webhook receives the call-standby notification:

    1 - Get the payload sent.
    2 - Update the event (call-standby) of a call in the database.
    3 - See if the user's phone exists in the database. If yes, send to queue 900. If not, create a new user in the database and send to queue 901.
    4 - Send delegate to API -> (POST)http://localhost:3001/api/client/actions (mock-pbx). Example sending payload:
    {
	    "type": "call.waiting",
	    "call_id": "eba893c0-11d5-11e8-bcfa-7f3bb08150aa",
	    "destination": "900"
    }

### 4.3 Third-event-call-waiting
When the webhook receives the call-waiting notification:

    1 - Get the payload sent.
    2 - Update the event (call-waiting) of a call in the database.

### 4.4 Fourth-event-actor-entered
When the webhook receives the actor-entered notification:

    1 - Get the payload sent.
    2 - Update the event (actor-entered) of a call in the database.

### 4.5 Fifth-event-call-ongoing
When the webhook receives the call-ongoing notification:

    1 - Get the payload sent.
    2 - Update the event (call-ongoing) of a call in the database.

### 4.6 Sixth-event-actor-left
When the webhook receives the actor-left notification:

    1 - Get the payload sent.
    2 - Update the event (actor-left) of a call in the database.

### 4.7 Seventh-event-call-finished
When the webhook receives the call-finished notification:

    1 - Get the payload sent.
    2 - Update the call-finished event of a call in the database.

## 5 Sending data to update the dashboard
To update the dashboard (frontend) using the API ->  (POST) http://localhost:3000/api/dashboard/count.

## 6 Development environment and track logs

To deploy the local server and run it in the development environment. Run the following command.

```bash
$ npm install
```

To run the integration test run the command below.

```bash
$ npm run integration-test
```

To deploy the local server and run it in the development environment. Run the following command.

```bash
$ npm run dev
```

## 7 Library/Framework

* dotenv
* http-status
* koa
* koa-body
* koa-cors
* koa-cors-error
* koa-mount
* koa-router
* koa-validate
* pm2
* restify
* restify-clients
* chai
* chai-as-promised
* chai-generator
* faker
* mocha
* nodemon
* nyc
* supertest