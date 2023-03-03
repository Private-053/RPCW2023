exports.pessoasPage = function(lista){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Pessoas</title>
            <link rel="stylesheet" href="../w3.css"/>
            <meta charset="utf-8"/>
        </head>
        <body>
        <div class="w3-card-4">                 
            <header class="w3-container w3-teal">                     
                <h1>Lista de Individuos</h1>                 
            </header>
            
            <div class="w3-container">
                <h2"> ${lista.length} Individuos</h2>
        
                <table class="w3-table-all">
                    <tr><th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th></tr>
            

            
    `

    for(let i=0; i<lista.length;i++){
        pagHTML += `
            <tr onclick="window.location.href = 'http://localhost:7777/pessoa/${lista[i].id}';" >
                <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td><td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
            </tr>

        `
    }
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