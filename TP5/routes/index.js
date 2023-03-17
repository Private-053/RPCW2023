var express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:3000/toDo')
    .then(response => {
    toDo = response.data
      axios.get('http://localhost:3000/done')
        .then(response => {
          done = response.data
          res.render('index', {toDo: toDo, done: done})
        })
        .catch(error => {
          console.log(error)
          res.render('error', {error: error})
        })
    })
    .catch(error => {
      console.log(error)
      res.render('error', {error: error})
    })
});

router.post('/adiciona', function(req, res, next) {
  axios.post('http://localhost:3000/toDo', {
    "who": req.body.who,
    "what": req.body.what,
    "dateDued": req.body.dateDued,
  })
  .then(function (response) {
    res.redirect('/')
  })
  .catch(function (error) {
    console.log(error);
    res.render('error', {error: error})
  })
})

router.post('/editar', function(req, res, next) {
  axios.put('http://localhost:3000/done/'+req.body.id, {
    "who": req.body.who,
    "what": req.body.what,
    "dateDued": req.body.dateDued,
  })
  .then(function (response) {
    res.redirect('/')
  })
  .catch(function (error) {
    console.log(error);
    res.render('error', {error: error})
  })
})



router.post('/eliminar/:list', function(req, res, next) {
  axios.delete('http://localhost:3000/'+req.params.list+'/'+req.body.id)
  .then(function (response) {
    res.redirect('/')
  })
  .catch(function (error) {
    console.log(error);
    res.render('error', {error: error})
  })
})


router.post('/concluir', function(req, res, next) {
  axios.get('http://localhost:3000/toDo/'+req.body.id)
  .then(function (response) {
    axios.post('http://localhost:3000/done', {
      "who": response.data.who,
      "what": response.data.what,
      "dateDued": response.data.dateDued,
    })
    .then(function (response) {
      axios.delete('http://localhost:3000/toDo/'+req.body.id)
      .then(function (response) {
        res.redirect('/')
      })
      .catch(function (error) {
        console.log(error);
        res.render('error', {error: error})
      })
    })
    .catch(function (error) {
      console.log(error);
      res.render('error', {error: error})
    })
  })
  .catch(function (error) {
    console.log(error);
    res.render('error', {error: error})
  })
})

router.post('/reverter', function(req, res, next) {
  axios.get('http://localhost:3000/done/'+req.body.id)
  .then(function (response) {
    axios.post('http://localhost:3000/toDo', {
      "who": response.data.who,
      "what": response.data.what,
      "dateDued": response.data.dateDued,
    })
    .then(function (response) {
      axios.delete('http://localhost:3000/done/'+req.body.id)
      .then(function (response) {
        res.redirect('/')
      })
      .catch(function (error) {
        console.log(error);
        res.render('error', {error: error})
      })
    })
    .catch(function (error) {
      console.log(error);
      res.render('error', {error: error})
    })
  })
  .catch(function (error) {
    console.log(error);
    res.render('error', {error: error})
  })
})



module.exports = router;
