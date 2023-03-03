exports.topJobsPage = function(lista){
    var jobs = {}

    for(let i=0; i<lista.length;i++){
        var pessoa = lista[i]
        var job = pessoa.profissao
        if(jobs[job]){
            jobs[job] +=1
        }else{
            jobs[job] = 1
        }
    }

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Top 10 Profissões</title>
            <link rel="stylesheet" href="w3.css"/>
            <meta charset="utf-8"/>
        </head>
        <body>
        <div class="w3-card-4">                 
            <header class="w3-container w3-teal">                     
                <h1>Top 10 Profissões</h1>                 
            </header>
            
            <div class="w3-container">        
                <table class="w3-table-all">
                    <tr><th>Nome</th><th>Individuos</th></tr>
            
    `
    const jobsSorted = Object.entries(jobs).sort((a, b) => b[1] - a[1]);

    //top10

    for(let i=0; i<10;i++){
        var profissao = jobsSorted[i][0]
        var numPraticantes = jobsSorted[i][1]
        pagHTML += `
                <tr onClick="window.location.href= '/desporto/${profissao}';">
                    <td>${profissao}</td>
                    <td>${numPraticantes}</td>
                </tr>`        
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