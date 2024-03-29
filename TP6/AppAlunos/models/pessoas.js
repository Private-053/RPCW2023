var mongoose = require('mongoose')

var moradaSchema = new mongoose.Schema({
    cidade: String,
    distrito: String
},{ _id : false })

var partidoSchema = new mongoose.Schema({
    party_abbr: String,
    party_name: String
},{ _id : false })


var atributosSchema = new mongoose.Schema({
    fumador: Boolean,
    gosta_cinema: Boolean,
    gosta_viajar: Boolean,
    acorda_cedo: Boolean,
    gosta_ler: Boolean,
    gosta_musica: Boolean,
    gosta_comer: Boolean,
    gosta_animais_estimacao: Boolean,
    gosta_dancar: Boolean,
    comida_favorita: String
},{ _id : false })

var pessoasSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    sexo: String,
    morada: moradaSchema,
    BI: String,
    CC: String,
    descrição: String,
    profissao: String,
    partido_politico: partidoSchema,
    religiao: String,
    desportos: [String],
    animais: [String],
    figura_publica_pt: [String],
    marca_carro: String,
    destinos_favoritos: [String],
    atributos: atributosSchema,
    id: String
},{ versionKey: false })
    
module.exports = mongoose.model('pessoa',pessoasSchema)
    
  