from watson_developer_cloud import NaturalLanguageUnderstandingV1, LanguageTranslatorV3
from watson_developer_cloud.natural_language_understanding_v1 import Features, EmotionOptions, SentimentOptions

def main(dict):
    # Handling previous errors for sequence
    if dict['err']:
        return dict
        
    try:
        # Emotion analysis is only supported in English, in other cases, you will translate the lyrics to English with Language Translator and then analyze them
        # Instantiating LT
        lt = LanguageTranslatorV3(
        version='2018-05-01',
        # Insert Language Translator APIKEY below
        iam_apikey='<apikey>',
        url='https://gateway.watsonplatform.net/language-translator/api'
        )
        
        # Identify the language with most confidence
        language = lt.identify(
        dict['lyrics']).get_result()['languages'][0]['language']
        
        # If not in English, translate to English
        if language != 'en':
            translation = lt.translate(
                text=dict['lyrics'],
                source=language,
                target='en'
            ).get_result()
            lyrics = translation['translations'][0]['translation']
            translated = True
        else:
            lyrics = dict['lyrics']
            translated = False
        
        # Instantiating NLU
        natural_language_understanding = NaturalLanguageUnderstandingV1(
            version='2019-07-12',
            # Insert your NLU service APIKEY below
            iam_apikey='<apikey>',
            url='https://gateway.watsonplatform.net/natural-language-understanding/api'
        )
        
        # Calling the service API
        response = natural_language_understanding.analyze(
            text=lyrics,
            features=Features(
                emotion=EmotionOptions(document=True),
                sentiment=SentimentOptions(document=True)
            )
        ).get_result()
        
        # Converting the response data into our api response
        emotions = {
            "Anger": response['emotion']['document']['emotion']['anger']*100,
            "Disgust": response['emotion']['document']['emotion']['disgust']*100,
            "Fear": response['emotion']['document']['emotion']['fear']*100,
            "Joy": response['emotion']['document']['emotion']['joy']*100,
            "Sadness": response['emotion']['document']['emotion']['sadness']*100,
            "Sentiment": response['sentiment']['document']
        }
        dict['emotions'] = emotions
        dict['err'] = False
        dict['translated'] = translated
        if translated:
            dict['translatedLyrics'] = lyrics
    except:
        dict['err'] = True
        dict['msg'] = 'There was an error analyzing the song lyrics.'
    return dict