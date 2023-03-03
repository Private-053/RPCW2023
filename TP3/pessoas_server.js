


var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./mypages')
var personal_pages = require('./personal_page')
var listSports = require('./listSports')
var top10 = require('./top10')
var fs = require('fs')


http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    var dicURL = url.parse(req.url, true)
    var pag_inicial = fs.readFileSync("pag_inicial.html", "utf-8")
    var pag_sexos = fs.readFileSync("bySex.html", "utf-8")
    var id = ""



    if (dicURL.pathname == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(pag_inicial)
    }
    else if (dicURL.pathname == '/listaPessoas') {
        axios.get("http://localhost:3000/pessoas")
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch(error => {
                console.log(error)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end("ERRO:" + error)
            })
    }
    else if (dicURL.pathname == '/ordenada') {
        axios.get("http://localhost:3000/pessoas?_sort=nome&_order=asc")
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch(error => {
                console.log(error)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end("ERRO:" + error)
            })
    }
    else if (dicURL.pathname == '/sexo') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(pag_sexos)
    }
    else if (dicURL.pathname == '/sexo/feminino') {
        axios.get("http://localhost:3000/pessoas?sexo=feminino")
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch(error => {
                console.log(error)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end("ERRO:" + error)
            })
    }
    else if (dicURL.pathname == '/sexo/masculino') {
        axios.get("http://localhost:3000/pessoas?sexo=masculino")
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch(error => {
                console.log(error)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end("ERRO:" + error)
            })
    }
    else if (dicURL.pathname == '/sexo/outro') {
        axios.get("http://localhost:3000/pessoas?sexo=outro")
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch(error => {
                console.log(error)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end("ERRO:" + error)
            })
    }
    else if (dicURL.pathname == '/desportos') {
        axios.get("http://localhost:3000/pessoas")
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(listSports.listSportsPage(pessoas))
            })
            .catch(error => {
                console.log(error)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end("ERRO:" + error)
            })
    }
    else if (dicURL.pathname.includes('/desporto/') ) {
        desporto = dicURL.pathname.split("/")[2]
        axios.get("http://localhost:3000/pessoas?q=" + desporto)
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch(error => {
                console.log(error)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end("ERRO:" + error)
            })
    }
    else if (dicURL.pathname.includes('/pessoa/') ) {
        id = dicURL.pathname.split("/")[2]
        axios.get("http://localhost:3000/pessoas/" + id)
            .then(function (resp) {
                var pessoa = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(personal_pages.personal_page(pessoa))
            })
            .catch(error => {
                console.log(error)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end("ERRO:" + error)
            })
    }
    else if (dicURL.pathname == '/top10profissoes') {
        axios.get("http://localhost:3000/pessoas")
            .then(function (resp) {
                var pessoas = resp.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(top10.topJobsPage(pessoas))
            })
            .catch(error => {
                console.log(error)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end("ERRO:" + error)
            })
    }
    else if (dicURL.pathname == "/w3.css") {
        fs.readFile("w3.css", function (erro, data) {
            res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' })
            if (erro)
                console.log("Erro na leitura do ficheiro w3.css")
            else
                res.write(data)
            res.end()
        })
    }
    else if (dicURL.pathname == "/sexo/w3.css") {
        fs.readFile("w3.css", function (erro, data) {
            res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' })
            if (erro)
                console.log("Erro na leitura do ficheiro w3.css")
            else
                res.write(data)
            res.end()
        })
    }
    else if (dicURL.pathname == "/desporto/w3.css") {
        fs.readFile("w3.css", function (erro, data) {
            res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' })
            if (erro)
                console.log("Erro na leitura do ficheiro w3.css")
            else
                res.write(data)
            res.end()
        })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end("ERRO: Operação não suportada")
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777...")