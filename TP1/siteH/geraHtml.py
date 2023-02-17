import json

def ordCidade(c):
    return c['city']

f = open("cities_hungary.json")
data = json.load(f)
data.sort(key=ordCidade)



pagWeb = """

    <table>
            <tr>
            <td width="30%" valign="top">
                    <h3>Index</h3>
                    <a name="indice"/>
                    <ul>
"""

for c in data:
    pagWeb += f"""
        <li>
            <a href="#{c['city']}">{c['city']}</a> 
        </li>
    """

pagWeb += """
</ul>
                </td>
                <td width="70%">
"""
for c in data:
    locais=""
    pagWeb += f"""
                    <a name="{c['city']}"/>
                    <h3>{c['city']}</h3>
                    <p><b>population:</b> {c['population']}</p>
                    <p><b>coordenates:</b> lat: {c['lat']} | lng: {c['lng']} </p>
                    <address>[<a href="#indice">Back to index</a>]</address>
                    <center>
                        <hr width="80%"/>
                    </center> 
    """

pagWeb += """      
                </td>
            </tr>
        </table>
"""
                    


#write in html file
f = open("template.html", "r")
final = open("hungary.html", "w")
texto = f.read()
texto = texto.replace("<!-- Lista com o índice -->", pagWeb)
final.seek(0)
final.truncate(0)
final.write(texto)
f.close()
final.close()