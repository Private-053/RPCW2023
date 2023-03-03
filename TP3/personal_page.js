exports.personal_page = function(person){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Pessoa</title>
            <link rel="stylesheet" href="../w3.css"/>
            <meta charset="utf-8"/>
        </head>
        <body>
        <div class="w3-card-4">                 
            <header class="w3-container w3-teal">                     
                <h1>Individuo</h1>                 
            </header>
            
            <div class="w3-container">
    `
    
    //turn Json into html

    pagHTML += `
        <h2> ${person.nome}</h2>
        <p>Idade: ${person.idade}</p>
        <p>Sexo: ${person.sexo}</p>
        <p>Cidade: ${person.morada.cidade}</p>
        <p>Distrito: ${person.morada.distrito}</p>
        <p>BI: ${person.BI}</p>
        <p>Profissão: ${person.profissao}</p>
        <p>Partido Político: ${person.party_name}</p>
        <p>Religião: ${person.religiao}</p>
        <p>Desportos: ${person.desportos}</p>
        <p>Animais: ${person.animais}</p>
        <p>Figura Pública: ${person.figura_publica_pt}</p>
        <p>Marca carro: ${person.marca_carro}</p>
        <p>Destinos Favoritos: ${person.destinos_favoritos}</p>
        <p>Atributos:</p>
        <ul>
            <li>Fumador: ${person.atributos.fumador}</li>
            <li>Gosta de cinema: ${person.atributos.gosta_cinema}</li>
            <li>Gosta de viajar: ${person.atributos.gosta_viajar}</li>
            <li>Acordar cedo: ${person.atributos.acorda_cedo}</li>
            <li>Gosta de ler: ${person.atributos.gosta_ler}</li>
            <li>Gosta de música: ${person.atributos.gosta_musica}</li>
            <li>Gosta de comer: ${person.atributos.gosta_comer}</li>
            <li>Gosta de animais de estimação: ${person.atributos.gosta_animais_estimacao}</li>
            <li>Gosta de dançar: ${person.atributos.gosta_dancar}</li>
            <li>Comida favorita: ${person.atributos.comida_favorita}</li>
        </ul>
        <p>ID: ${person.id}</p>
        `

    pagHTML += `
            </div>

            <footer class="w3-container w3-blue">
                <h5>Generated in RPCW</h5>
            </footer>
        </div>
        </body>
    </html>
    `
    return pagHTML;
}