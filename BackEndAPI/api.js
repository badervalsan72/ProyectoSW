var Paises = require('./models/Paises');
const paisesOps = require('./operations/PaisesOps');


var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { response } = require('express');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
})

router.route('/paises').get((request, response) => {
    paisesOps.getPaises().then(result => {
        response.json(result[0]);
    })
})

router.route('/paises/:id').get((request, response) => {
    paisesOps.getPais(request.params.id).then(result => {
        response.json(result[0]);
    })
})

router.route('/paises').post((request, response) => {
    let pais = {...request.body }

    paisesOps.addPais(pais).then(result => {
        response.status(201).json(result);
    })
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Paises API is running at ' + port);




router.route('/api/Usuarios/validarUsuario').post((request, response) => {

    UsuariosOps.validarUsuario(request.body.username).then(result => {

        response.json(result)

    }).catch((err) => { console.log(err) })
})