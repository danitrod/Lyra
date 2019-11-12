from urllib import request
import re
from bs4 import BeautifulSoup as BS

def main(dict):
    try:
        # Requesting HTML
        baseUrl = 'https://www.letras.com/'
        artist = dict['artist'].replace(' ', '-')
        page = request.urlopen(baseUrl+artist)

        # Converting page to lower case and parsing with BS
        caseSensitiveSoup = BS(page, 'html.parser')
        lowerCase = str(caseSensitiveSoup).lower()
        soup = BS(lowerCase, 'html.parser')

        # Finding our song anchor
        songAnchors = soup.findAll('a', text=dict['song'].lower())

        # Returning
        if len(songAnchors) == 0:
            # Song not found
            dict['msg'] = 'A música %s para o artista %s não foi encontrada.' % (
                dict['song'], dict['artist'])
            dict['err'] = True
            dict['errCode'] = 101
        else:
            # Getting song url and capitalized names
            songLink = str(songAnchors[0].get('href'))[1:]
            songName = str(caseSensitiveSoup.find(href=re.compile(songLink)).get_text())
            dict['err'] = False
            dict['url'] = baseUrl+songLink
            dict['status'] = 'URL encontrada.'
            dict['song'] = songName
            dict['artist'] = str(caseSensitiveSoup.find('div', attrs={'class':'cnt-head_title'}).get_text()).strip()
        return dict
    except:
        dict['err'] = True
        dict['msg'] = 'Houve um erro na requisição. Aguarde um momento.'
        return dict