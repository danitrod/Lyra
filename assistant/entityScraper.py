from urllib import request
from bs4 import BeautifulSoup as BS

page = request.urlopen('https://www.letras.mus.br/mais-acessadas/')
soup = BS(page, 'html.parser')

# Scraping top artists
artistList = soup.find('ol', attrs={'class': 'top-list_art'})
artists = []
for artist in artistList.findAll('li'):
    artists.append(artist.get_text().strip())

# Scraping top songs
songList = soup.find('ol', attrs={'class': 'top-list_mus cnt-list--col1-3'})
songs = []
for song in songList.findAll('b'):
    songs.append(song.get_text().strip())

# Saving to csv
with open('assistant/entities.csv', 'w') as f:
    for artist in artists:
        f.write('artista,"%s"\n'%artist)
    for song in songs:
        f.write('musica,"%s"\n'%song)