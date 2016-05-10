from bs4 import BeautifulSoup
from os.path import basename, splitext
file= open('sfdsf.html', 'r+')
linestring = file.read()
file.close()
soup = BeautifulSoup(linestring,"html5lib")
for img in soup.findAll('input'):
    #img['src'] = 'cid:' + splitext(basename(img['src']))[0]
    if img.get("path") is not None:
        img['name'] =img.get("path")
        img['path'] = "karthik"
         
my_html_string = str(soup.prettify()).replace('path="karthik"','')
file= open('new.html', 'w+')
file.write(my_html_string)
file.close)(

