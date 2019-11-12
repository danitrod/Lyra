# Lyra, the song analyzer

Lyra makes use of the Watson Natural Language Understanding API to analyze song lyrics. The backend calls a serverless function sequence that scrapes https://www.letras.com and then calls NLU to analyze the song's emotion and sentiment.
