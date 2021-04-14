var Paises = require('./models/Paises');
const paisesOps = require('./operations/PaisesOps');
const UsuariosOps = require('./operations/UsuariosOps');
const RolesOps = require('./operations/RolesOps');
const ConsecutivosOps = require('./operations/ConsecutivosOps')

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { response } = require('express');
var app = express();
var router = express.Router();
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
// preguntar si borrar esto 
app.use(session({ secret: 'secret' })); //No me queda muy claro esto

/******SESIONES*******/
var sess; //ESTO NO FUNCIONA CON MULTIPLES USUARIOS

app.route('/').get(function(req, res) {
    sess = req.session;
    sess.email;
    sess.username;
});

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
// 
// 
// 
//
//


/*****SESIONES*******/

router.use((request, response, next) => {
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

router.route('/Usuarios/validarUsuario').post((request, response) => {

    UsuariosOps.validarUsuario(request.body.username, request.body.email).then(result => {

        response.json(result)
            //Prueba para ver si llega aqui


    }).catch((err) => { console.log(err) })
})

router.route('/Usuarios/agregarUsuario').post((request, response) => {
    UsuariosOps.addUsuario(request.body.username, request.body.nombre, request.body.apellido1, request.body.apellido2, request.body.email, request.body.passwd, request.body.rol).then(result => {

        response.json(result)
            //Prueba para ver si llega aqui


    }).catch((err) => { console.log(err) })
})

router.route('/Usuarios/validarUsuarioLogin').post((request, response) => {
    UsuariosOps.validarUsuarioLogin(request.body.email, request.body.password).then(result => {

        response.json(result)
            //Prueba para ver si llega aqui


    }).catch((err) => { console.log(err) })
})

router.route('/Usuarios/getRolUsuario').post((request, response) => {
    UsuariosOps.getRolUsuario(request.body.email).then(result => {

        response.json(result)



    }).catch((err) => { console.log(err) })
})

router.route('/Usuarios').get((request, response) => {
    UsuariosOps.getUsuarios().then(result => {
        response.json(result[0]);
    })
})

router.route('/Roles').get((request, response) => {
    RolesOps.getRoles().then(result => {
        response.json(result[0]);
    })
})
router.route('/getConsecutivo').post((request, response) => {
    ConsecutivosOps.getConsecutivo(request.body.consecutivoID).then(result => {
        response.json(result[0]);
    }).catch((err) => { console.log(err) })
})

router.route('/Consecutivos').get((request, response) => {
    ConsecutivosOps.getConsecutivos().then(result => {
        response.json(result[0]);
    })
})

router.route('/Consecutivos1').post((request, response) => {
    ConsecutivosOps.addConsecutivo1(request.body.consecutivoID, request.body.consecutivo, request.body.descripcion, request.body.poseePrefijo, request.body.prefijo, request.body.poseeRango, request.body.rangoInicial, request.body.rangoFinal).then(result => {
        response.json(result[0]);
    }).catch((err) => { console.log(err) })
})

router.route('/Consecutivos2').post((request, response) => {
    ConsecutivosOps.addConsecutivo2(request.body.ConsecutivoID, request.body.Descripcion, request.body.PoseePrefijo, request.body.Prefijo, request.body.PoseeRango, request.body.RangoInicial, request.body.RangoFinal).then(result => {

        //Prueba para ver si llega aqui

    }).catch((err) => { console.log(err) })
})

router.route('/Consecutivos3').post((request, response) => {
    ConsecutivosOps.addConsecutivo3(request.body.ConsecutivoID, request.body.Descripcion, request.body.PoseePrefijo, request.body.Prefijo, request.body.PoseeRango, request.body.RangoInicial, request.body.RangoFinal).then(result => {

        //Prueba para ver si llega aqui

    }).catch((err) => { console.log(err) })
})

router.route('/Consecutivos4').post((request, response) => {
    ConsecutivosOps.addConsecutivo4(request.body.ConsecutivoID, request.body.Descripcion, request.body.PoseePrefijo, request.body.Prefijo, request.body.PoseeRango, request.body.RangoInicial, request.body.RangoFinal).then(result => {

        //Prueba para ver si llega aqui

    }).catch((err) => { console.log(err) })
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('backend API is running at ' + port);