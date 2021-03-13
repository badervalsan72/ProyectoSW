var Db = require('./dboperations'); 
var Paises = require('./paises'); 
const dboperations = require('./dboperations');

var express = require('express'); 
var bodyParser = require('body-parser');
var cors = require('cors'); 
const { response } = require('express');
var app = express(); 
var router = express.Router(); 

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 
app.use(cors()); 
app.use('/api', router);  

router.use((request, response, next) => {
    console.log('middleware'); 
    next();
})

router.route('/paises').get((request, response) => {
    dboperations.getPaises().then(result => {        
        response.json(result[0]); 
    })
})

router.route('/paises/:id').get((request, response) => {
    dboperations.getPais(request.params.id).then(result => {        
        response.json(result[0]); 
    })
})

router.route('/paises').post((request, response) => {
    let pais = {...request.body}

    dboperations.addPais(pais).then(result => {
        response.status(201).json(result); 
    })
})

var port = process.env.PORT || 8090; 
app.listen(port); 
console.log('Paises API is running at ' + port); 


