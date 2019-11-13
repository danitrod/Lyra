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
    
        # Getting correctly capitalized artist name
        artistName = str(caseSensitiveSoup.find('div', attrs={'class':'cnt-head_title'}).get_text()).strip()
        
        # Finding our song anchor
        songAnchors = soup.findAll('a', text=dict['song'].lower())
    
        # Returning
        if len(songAnchors) == 0:
            # Song not found
            dict['msg'] = 'The song %s, by %s, was not found.' % (
                dict['song'].upper(), artistName)
            dict['err'] = True
        else:
            # Finding song url and correctly capitalized song name
            songLink = str(songAnchors[0].get('href'))[1:]
            songName = str(caseSensitiveSoup.find(href=re.compile(songLink)).get_text())
            dict['err'] = False
            dict['url'] = baseUrl+songLink
            dict['song'] = songName
            dict['artist'] = artistName
    except:
        # Page not found
        dict['err'] = True
        dict['msg'] = 'The artist %s was not found.'%dict['artist'].upper()
    return dict