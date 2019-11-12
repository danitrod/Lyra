from urllib import request
from bs4 import BeautifulSoup as BS

def main(dict):
    if dict['err']:
        return dict
    
    page = request.urlopen(dict['url'])
    soup = BS(page, 'html.parser')
    
    lbReplace = str(soup.find('div', attrs={'class': 'cnt-letra p402_premium'})).replace('<br/>','\n').replace('</p><p>', '\n\n').replace('<br>','\n').replace('<div class="cnt-letra p402_premium"> <p>','')
    parse = BS(lbReplace, 'html.parser')
    lyrics = parse.text.strip()
        
    dict['lyrics'] = lyrics
    return dict