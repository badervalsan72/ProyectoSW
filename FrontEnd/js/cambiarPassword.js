async function cambiarPassword() {
    let email = document.getElementById("email").value;
    let oldPass = document.getElementById("oldPwd").value;
    let newPass = document.getElementById("newPwd").value;
    let repeatedNewPass = document.getElementById("repeatedNewPwd").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var key = CryptoJS.enc.Hex.parse('password');

    let encryptedEmail = CryptoJS.AES.encrypt(email, key, {
        mode: CryptoJS.mode.ECB,
    }).toString();

    let encryptedOldPass = CryptoJS.AES.encrypt(oldPass, key, {
        mode: CryptoJS.mode.ECB,
    }).toString();

    var contenido = JSON.stringify({
        "email": encryptedEmail,
        "password": encryptedOldPass
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: contenido,

    };

    let result = await fetch('http://localhost:8090/api/Usuarios/validarUsuarioLogin', requestOptions)
        .then(response => response.text())
        .then(result => result.toString())
        .catch(error => console.log('error', error))

    if (result > 0) {

        if (newPass == repeatedNewPass) {

            let encryptedNewPass = CryptoJS.AES.encrypt(repeatedNewPass, key, {
                mode: CryptoJS.mode.ECB,
            }).toString();

            var contenidoUpdate = JSON.stringify({
                "email": encryptedEmail,
                "password": encryptedNewPass

            });

            var requestOptionsUpdate = {
                method: 'POST',
                headers: myHeaders,
                body: contenidoUpdate,

            };

            let resultUpdate = await fetch('http://localhost:8090/api/Usuarios/updatePassUser', requestOptionsUpdate)
                .then(response => response.text())
                .then(result => result.toString())
                .catch(error => console.log('error', error))

            alert("Cambio de contraseña exitoso. ");
            window.location = "/Frontend/cambiarcontraseña.html"

        } else {
            alert("Contraseñas no coinciden. ");
        }
    } else {
        alert("Correo electronico o contraseña incorrectos. ");
    }
}
let encryptedOldPass = CryptoJS.AES.encrypt(oldPass, key, {
    mode: CryptoJS.mode.ECB,
}).toString();

function cancelarCambio() {
    window.location = "/Frontend/cambiarcontraseña.html"
}