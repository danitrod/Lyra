<div align="center">
<a href="https://cloud.ibm.com">
<img src="https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg" />
</a>
</div>

# Lyra, the song analyzer

Lyra makes use of the Watson Natural Language Understanding (NLU) API to analyze song lyrics. The backend calls a serverless function sequence that scrapes song lyrics from https://www.letras.com using Beautiful Soup and then calls NLU to analyze the song's emotion and sentiment. The analysis is supported in any language!

Check the app out on https://lyra.mybluemix.net.

## Index

* [Flow](#Flow)
* [Set up](#Creating-the-Serverless-sequence-and-actions-via-IBM-Cloud-Functions-GUI)
* [Run locally](#Running-the-app-locally)
* [Deploy](#Deploying-the-app-to-the-cloud)

## Flow
![flow](doc/source/images/flow.png)

## Creating the Serverless sequence and actions via IBM Cloud Functions GUI

Being logged in on IBM Cloud, open [IBM Cloud Functions](https://cloud.ibm.com/functions/actions). For every file in the [actions folder](./doc/source/actions), create an action and paste the code inside. In the `analyzeLyrics.py` action, remember to type your service apikeys:
- Line 15: Language Translator apikey
- Line 40: Natural Language Understanding apikey

If you don't have the apikeys, simply create a free instance of [Language Translator](https://cloud.ibm.com/catalog/services/language-translator) and [Natural Language Understanding](https://cloud.ibm.com/catalog/services/natural-language-understanding) to get them. Then, create a sequence for scraping the lyrics. It should include the three actions, in the following order:
1. songSearcher.py
2. lyricScraper.py
3. analyzeLyrics.py

## Making your Python API Public with API Connect
Go to the [Functions API management section](https://cloud.ibm.com/functions/apimanagement) and create a Managed API. Name it whatever you like. Go to your newly created Managed API and go to the section `Definition`. There, create an operation, give it a path, set the method to `POST` and select your sequence. After creating the operation, remember to scroll down the screen and click on `Save` to save your changes. Now, go back to `Summary` and copy the route on the screen to your API. Insert this route in the [server file](./server/server.js), line 16 and add a `/<your path name>` to the end of the route. Your server should now be able to connect to your API operation.

## Running the app locally
Simpy clone the repo, put your API route in the server file (step above) and run the following commands from the root directory:

```
# Installs dependencies
cd client && npm install && cd ../server npm install

# Builds app and runs locally
npm run local
```

## Deploying the app to the cloud
NOTE: You must have the [IBM Cloud Command Line Interface](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started) installed in your machine to follow the next steps.

After [setting up](#Creating-the-Serverless-sequence-and-actions-via-IBM-Cloud-Functions-GUI) and making sure the app is working, go to the `/server` directory, change your app and route names on the [manifest file](./server/manifest.yml) (lines 3 and 8) and run the following commands:

```
# Logs into the IBM Cloud
ibmcloud login

# Selects a Cloud Foundry organization and space to deploy your app
ibmcloud target --cf

# Builds the client and deploys app to cloud
npm run deploy
```
