/* 
var axios = require('axios')
const { get } = require('https')
*/

const postUsuario = async function(TheUrl, nombreUsuario, email) { //CAMBIAR NOMBRE Y PARAMETROS
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var key = CryptoJS.enc.Hex.parse('password');
    let encryptedUser = CryptoJS.AES.encrypt(nombreUsuario, key, {
        mode: CryptoJS.mode.ECB,
    }).toString(); //contraseña = "password"

    let encryptedEmail = CryptoJS.AES.encrypt(email, key, {
        mode: CryptoJS.mode.ECB,
    }).toString();


    var contenido = JSON.stringify({
        "username": encryptedUser,
        "email": encryptedEmail
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
    let rol = 6;

    let result = await postUsuario('http://localhost:8090/api/Usuarios/validarUsuario', username, email);

    if (result > 0) {
        alert("Usuario o correo ya está registrado en la base de datos.")

    } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var key = CryptoJS.enc.Hex.parse('password');

        let encryptedName = CryptoJS.AES.encrypt(nombre, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();

        let encryptedUser = CryptoJS.AES.encrypt(username, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();

        let encryptedApellido1 = CryptoJS.AES.encrypt(apellido1, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();

        let encryptedApellido2 = CryptoJS.AES.encrypt(apellido2, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();

        let encryptedEmail = CryptoJS.AES.encrypt(email, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();

        let encryptedPass = CryptoJS.AES.encrypt(passwd, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();


        var contenido = JSON.stringify({
            "username": encryptedUser,
            "nombre": encryptedName,
            "apellido1": encryptedApellido1,
            "apellido2": encryptedApellido2,
            "email": encryptedEmail,
            "passwd": encryptedPass,
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


        if (confirm("Usuario creado exitosamente!")) {
            window.location = '/Frontend/login.html';
        } else {
            window.location = '/Frontend/registro.html';
        }
    }

}