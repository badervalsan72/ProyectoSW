async function crearUsuario() {

    let nombre = document.getElementById("nombre").value;
    let apellido1 = document.getElementById("apellido1").value;
    let apellido2 = document.getElementById("apellido2").value;
    let username = document.getElementById("username").value;
    let passwd = document.getElementById("passwd").value;
    let email = document.getElementById("correo").value;
    let rol = document.getElementById("displaySelect").value;


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var key = CryptoJS.enc.Hex.parse('password');
    let encryptedUser = CryptoJS.AES.encrypt(username, key, {
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
    let result = await fetch('http://localhost:8090/api/Usuarios/validarUsuario', requestOptions)
        .then(response => response.text())
        .then(result => result.toString())
        .catch(error => console.log('error', error))


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

        alert("Usuario creado.")
        window.location = "/FrontEnd/crearUsuario.html"
    }
}