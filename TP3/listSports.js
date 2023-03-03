exports.listSportsPage = function(lista){
    var desportos = {}

    for(let i=0; i<lista.length;i++){
        var pessoa = lista[i]
        for(let j=0; j<pessoa.desportos.length;j++){
            var desporto = pessoa.desportos[j]
            if(desportos[desporto]){
                desportos[desporto] +=1
            }else{
                desportos[desporto] = 1
            }
        }
    }

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Lista de Desportos</title>
            <link rel="stylesheet" href="../w3.css"/>
            <meta charset="utf-8"/>
        </head>
        <body>
        <div class="w3-card-4">                 
            <header class="w3-container w3-teal">                     
                <h1>Lista de Desportos</h1>                 
            </header>
            
            <div class="w3-container">        
                <table class="w3-table-all">
                    <tr><th>Nome</th><th>Individuos</th></tr>
            
    `
    const desportosSorted = Object.entries(desportos).sort((a, b) => b[1] - a[1]);

        // loop through the desportos object and add a row for each sport
        desportosSorted.forEach(([desporto, numPraticantes]) => {
            pagHTML += `
                <tr onClick="window.location.href= '/desporto/${desporto}';">
                    <td>${desporto}</td>
                    <td>${numPraticantes}</td>
                </tr>`
    })

    pagHTML += `
            </table> 
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