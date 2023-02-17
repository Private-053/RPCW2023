import json

def ordCidade(c):
    return c['nome']

f = open("mapa.json")
data = json.load(f)
cidades = data['cidades']
cidades.sort(key=ordCidade)
ligacoes = data['ligações']



pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice"/>
                    <!-- Lista com o índice -->
                    <ul>
"""

for c in cidades:
    pagWeb += f"""
        <li>
            <a href="#{c['id']}">{c['nome']}</a> 
        </li>
    """

pagWeb += """
</ul>
                </td>
                <td width="70%">
"""
for c in cidades:
    locais=""
    for l in ligacoes:
        if l['origem'] == c['id']:
            for c2 in cidades:
                if c2['id'] == l['destino']:
                    nome_cidade=c2['nome']
                    break
            locais += f"""
                <li>
                    <a href="#{l['destino']}">{nome_cidade} : {l['distância']}</a>
                </li>
            """
        elif l['destino'] == c['id']:
            for c2 in cidades:
                if c2['id'] == l['origem']:
                    nome_cidade=c2['nome']
                    break
            locais += f"""
                <li>
                    <a href="#{l['origem']}">{nome_cidade} : {l['distância']}</a>
                </li>
            """
    pagWeb += f"""
                    <a name="{c['id']}"/>
                    <h3>{c['nome']}</h3>
                    <p><b>população:</b> {c['população']}</p>
                    <p><b>descrição:</b> {c['descrição']}</p>
                    <p><b>distrito:</b> {c['distrito']}</p>
                    <p><b>ligações:</b> {locais}</p>
                    <address>[<a href="#indice">Voltar ao índice</a>]</address>
                    <center>
                        <hr width="80%"/>
                    </center> 
    """

pagWeb += """      
                </td>
            </tr>
        </table>
    </body>
</html>
"""
                    


#write in html file
f = open("mapa.html", "w")
f.write(pagWeb)
f.close()