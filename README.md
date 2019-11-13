<div align="center">
<a href="https://cloud.ibm.com">
<img src="https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg" />
</a>
</div>

# Lyra, the song analyzer

Lyra makes use of the Watson Natural Language Understanding API to analyze song lyrics. The backend calls a serverless function sequence that scrapes song lyrics from https://www.letras.com and then calls NLU to analyze the song's emotion and sentiment.

<!-- ## Index

* [1. Run local](#1-introdução)
* [2. Deploy](#2-deploy) -->

## Creating the Serverless sequence and actions via IBM Cloud Functions GUI

Being logged in on IBM Cloud, open [IBM Cloud Functions](https://cloud.ibm.com/functions/actions). For every file in the [actions folder](./actions), create an action and paste the code inside. In the `analyzeLyrics.py` action, remember to type your service APIKEY in line 15 (if you don't have an APIKEY, simply create a free instance of Watson Natural Language Understanding in this link and then copy-paste the apikey). Then, create a sequence for scraping the lyrics. It should include 