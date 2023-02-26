import sys
from bs4 import BeautifulSoup

def parser(file):
    xml = open(file).read()
    soup = BeautifulSoup(xml,features="lxml")
    i=1
    lista = []
    for message in soup.findAll('arqelem'):
        output = open("arqelems/arq" + str(i) + ".xml", "w")
        output.write(message.prettify())
        lista.append((message.identi.get_text().strip(),i,message))
        i+=1

    return lista

def index(lista):
    index = open("index.html", "w")

    pagWeb = """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Arqueossitios</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h3>Índice</h3>
            <!-- Lista com o índice -->
            <ul>
    """

    for (nome,id,_) in lista:
        pagWeb += f"""
        <li>
            <a href="/{id}">{nome}</a>
        </li>
        """

    pagWeb += """
            </ul> 
        </body>
    </html>
    """

    index.write(pagWeb) 

if __name__ == "__main__":
    content = parser("arq.xml")
    index(content)
