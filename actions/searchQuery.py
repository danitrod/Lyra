from urllib import request
from bs4 import BeautifulSoup as BS

baseUrl = 'https://www.letras.com/'
# page = request.urlopen(baseUrl+'?q='+'Bowling for soup'.replace(' ', '%20'))
page = request.urlopen(baseUrl+'?q=queen')
print(baseUrl+'?q='+'Bowling for soup'.replace(' ', '%20'))
# Parsing with BS
soup = BS(page, 'html.parser')

# Finding the search results
divs = soup.find('div', attrs={'id': 'cse-search-results'}).getText()
print(divs)
