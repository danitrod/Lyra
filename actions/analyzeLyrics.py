import json
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 import Features, EmotionOptions, SentimentOptions

def main(dict):
    try:
        natural_language_understanding = NaturalLanguageUnderstandingV1(
            version='2019-07-12',
            iam_apikey='C4FEHaO1j6l1vi7qQuY4Abb7gwN4GCIjuyyVGJvVg1q1',
            url='https://gateway.watsonplatform.net/natural-language-understanding/api'
        )
        
        response = natural_language_understanding.analyze(
            text=dict['lyrics'],
            features=Features(
                emotion=EmotionOptions(document=True),
                sentiment=SentimentOptions(document=True))).get_result()
        emotions = 'Anger: %.2f%%\nDisgust: %.2f%%\nFear: %.2f%%\nJoy: %.2f%%\nSadness: %.2f%%\nSentiment: %s (%.2f%%)'%(
            response['emotion']['document']['emotion']['anger']*100, 
            response['emotion']['document']['emotion']['disgust']*100,
            response['emotion']['document']['emotion']['fear']*100, 
            response['emotion']['document']['emotion']['joy']*100, 
            response['emotion']['document']['emotion']['sadness']*100,
            response['sentiment']['document']['label'],
            abs(response['sentiment']['document']['score']*100)
            )
        dict['emotions'] = emotions
        dict['err'] = False
    except:
        dict['err'] = True
        dict['msg'] = 'Houve um erro ao analisar as letras de música.'
    return dict