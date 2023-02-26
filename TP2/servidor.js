var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    var numPag = req.url.substring(1)
    if (numPag == ""){
        pag = "index.html"
    }
    else{
        pag = 'arqelems/arq'+numPag+'.xml'
    }
    fs.readFile(pag, function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        if(err)
            res.write('Erro: ' + err);
        else 
            res.write(data)
        
        res.end();
    }) 
}).listen(5353);

console.log('Servidor à escuta na porta 5353...');