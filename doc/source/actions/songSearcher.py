from urllib import request
import re
from bs4 import BeautifulSoup as BS

def fuzzy(match, phrases):
    # Greedy algorithm to fuzzy matching for song names, with a punctuation system
    wordMatches = match.lower().split(' ')
    ratios = {}
    for phrase in phrases:
        # Compare each letter between the parameter and the expected for each word
        words = phrase.lower().split(' ', len(wordMatches)-1)
        count = 0
        for i in range(len(words)):
            for j in range(len(words[i])):
                # Compare the letter from the current word with the previous, same and next position letter from the matching word
                if j >= len(wordMatches[i]):
                    break
                if words[i][j] == wordMatches[i][j]:
                    count += 1
                if j < len(wordMatches[i])-1:
                    if words[i][j] == wordMatches[i][j+1]:
                        count += 1
                if j > 0:
                    if words[i][j] == wordMatches[i][j-1]:
                        count += 1

            if len(words[i]) > 4 and len(wordMatches[i]) > 4:
                # Extra points to equal groups of 4 letters in the actual, previous or next position
                for j in range(0, len(words[i])-4):
                    if j > len(wordMatches[i])-4:
                        break
                    if j+1 <= len(wordMatches[i])-4:
                        if words[i][j:j+4] == wordMatches[i][j+1:j+5]:
                            count += 2
                    if j-1 >= 0:
                        if words[i][j:j+4] == wordMatches[i][j-1:j+3]:
                            count += 2
                    if words[i][j:j+4] == wordMatches[i][j:j+4]:
                        count += 4
        ratios[phrase] = count
    # Returning sorted list
    results = [[k, v] for k, v in ratios.items() if v > len(match)/2]
    results.sort(key=lambda x: x[1], reverse=True)
    return results

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
        songAnchors = soup.findAll('a', attrs={'class': 'song-name'})
        for i in range(len(songAnchors)):
            songAnchors[i] = songAnchors[i].get_text()
        songs = fuzzy(dict['song'], songAnchors)

        # Returning
        if len(songs) == 0:
            # Song not found
            dict['msg'] = 'The song %s, by %s, was not found.' % (
                dict['song'].upper(), artistName)
            dict['err'] = True
        else:
            # Finding song url and correctly capitalized song name
            songLink = str(soup.find('a', text=songs[0][0]).get('href'))[1:]
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
