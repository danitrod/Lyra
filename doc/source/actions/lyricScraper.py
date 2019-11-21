from urllib import request
from bs4 import BeautifulSoup as BS

def main(dict):
    # Handling previous errors for sequence
    if dict['err']:
        return dict
    
    try:
        # Call page and parse HTML
        page = request.urlopen(dict['url'])
        soup = BS(page, 'html.parser')
        
        # Scraping and adding line breaks instead of HTML tags
        lyricsText = str(soup.find('div', attrs={'class': 'cnt-letra p402_premium'})).replace('<br/>','\n').replace('</p><p>', '\n\n').replace('<br>','\n').replace('<div class="cnt-letra p402_premium"> <p>','')
        parse = BS(lyricsText, 'html.parser')
        lyrics = parse.text.strip()
        dict['lyrics'] = lyrics
    except:
        dict['msg'] = 'There was an unknown error processing your request.'
        dict['err'] = True
    return dict