// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');


// Server creation


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var tarefasServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if((req.url == "/")) {
                    axios.get("http://localhost:3000/toDo")
                        .then(response => {
                            var toDo = response.data
                            axios.get("http://localhost:3000/done")
                                .then(response => {
                                    var done = response.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.toDoListPage(toDo, done, d))
                                    res.end()
                                })
                                .catch(function(erro){
                                    console.log("Erro na obtenção da lista de tarefas: " + erro)
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                                    res.end()
                                })
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                            res.end()
                        })
                }
                break
            case "POST":
                if(req.url == '/adiciona'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/toDo', {
                                "who": result.who,
                                "what": result.what,
                                "dateDued": result.dateDued,
                            })
                            .then(function (response) {
                                res.writeHead(302, {'Location': '/'})
                                res.end()
                            })
                            .catch(function (error) {
                                console.log(error);
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível adicionar a tarefa... Erro: " + error)
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else if(req.url == '/editar'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/done/'+result.id, {
                                "who": result.who,
                                "what": result.what,
                                "dateDued": result.dateDued,
                            })
                            .then(function (response) {
                                res.writeHead(302, {'Location': '/'})
                                res.end()
                            })
                            .catch(function (error) {
                                console.log(error);
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível adicionar a tarefa... Erro: " + error)
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else if(req.url == '/eliminar'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.delete('http://localhost:3000/toDo/'+result.id)
                            .then(function (response) {
                                res.writeHead(302, {'Location': '/'})
                                res.end()
                            })
                            .catch(function (error) {
                                axios.delete('http://localhost:3000/done/'+result.id)
                                .then(function (response) {
                                    res.writeHead(302, {'Location': '/'})
                                    res.end()
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível adicionar a tarefa... Erro: " + error)
                                    res.end()
                            })
                        })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else if(req.url == '/concluir'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.get('http://localhost:3000/toDo/'+result.id)
                            .then(function (response) {
                                axios.post('http://localhost:3000/done', {
                                "who": response.data.who,
                                "what": response.data.what,
                                "dateDued": response.data.dateDued,
                                })
                                .then(function (response) {
                                    axios.delete('http://localhost:3000/toDo/'+result.id)
                                    .then(function (response) {
                                        res.writeHead(302, {'Location': '/'})
                                        res.end()
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write("<p>Não foi possível adicionar a tarefa... Erro: " + error)
                                        res.end()
                                    })
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível adicionar a tarefa... Erro: " + error)
                                    res.end()
                                })
                            })
                            .catch(function (error) {
                                console.log(error);
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível adicionar a tarefa... Erro: " + error)
                                res.end()
                            })
                    }})
                }
                else{
                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>Unable to collect data from body...</p>")
                    res.end()
                }
                break
            default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " unsupported in this server.</p>")
            res.end()
        }
    }
    
})

tarefasServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



