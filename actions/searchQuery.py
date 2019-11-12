from urllib import request
import time
from bs4 import BeautifulSoup as BS
from selenium import webdriver

baseUrl = 'https://www.letras.com/'
# page = request.urlopen(baseUrl+'?q='+'Bowling for soup'.replace(' ', '%20'))
# page = request.urlopen()
driver = webdriver.Firefox()
driver.get(baseUrl+'?q=queen')
time.sleep(2)
print(driver.page_source)
# print(baseUrl+'?q='+'Bowling for soup'.replace(' ', '%20'))

# Parsing with BS
# soup = BS(page, 'html.parser')

# Finding the search results
# divs = soup.findAll('div', attrs={'id': 'cse-search-results'})
# print(divs)
