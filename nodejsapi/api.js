const dboperations = require('./dboperations');
var Db = require('./dboperations'); 
var Paises = require('./paises'); 

dboperations.getPiases().then(result => { 
    console.log(result); 

})