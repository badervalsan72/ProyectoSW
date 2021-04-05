/* 
var axios = require('axios')
const { get } = require('https')
*/

const postUsuario = async function(TheUrl, nombreUsuario, email) { //CAMBIAR NOMBRE Y PARAMETROS
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var contenido = JSON.stringify({
        "username": nombreUsuario,
        "email": email
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: contenido,

    };
    let resulted = await fetch(TheUrl, requestOptions)
        .then(response => response.text())
        .then(result => result.toString())
        .catch(error => console.log('error', error))

    return resulted;
}



async function registrarse() {

    let nombre = document.getElementById('nombre').value;
    let apellido1 = document.getElementById('apellido1').value;
    let apellido2 = document.getElementById('apellido2').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let passwd = document.getElementById('passwd').value;
    let rol = 5;

    let result = await postUsuario('http://localhost:8090/api/Usuarios/validarUsuario', username, email);

    if (result > 0) {
        alert("Usuario o correo ya está registrado en la base de datos.")

    } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var contenido = JSON.stringify({
            "username": username,
            "nombre": nombre,
            "apellido1": apellido1,
            "apellido2": apellido2,
            "email": email,
            "passwd": passwd,
            "rol": rol

        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: contenido,

        };
        await fetch('http://localhost:8090/api/Usuarios/agregarUsuario', requestOptions)
            .then(response => response.text())
            .then(result => result.toString())
            .then(console.log(result))
            .catch(error => console.log('error', error))


    }

}