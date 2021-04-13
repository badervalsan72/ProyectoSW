const validarUserLogin = async function(TheUrl, email, passwd) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let encrypterEmail = CryptoJS.AES.encrypt(email, "password").toString();
    let encryptedPass = CryptoJS.AES.encrypt(passwd, "password").toString();

    var contenido = JSON.stringify({
        "email": encrypterEmail,
        "password": encryptedPass
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



async function loginUser() {

    let email = document.getElementById('email').value
    let passwd = document.getElementById('passwd').value

    let result = await validarUserLogin('http://localhost:8090/api/Usuarios/validarUsuarioLogin', email, passwd);



    if (result > 0) {
        sessionStorage.setItem('email', email)
        window.location = '/Frontend/index.html';

    } else {
        alert('Usuario o contraseña invalidos.');
    }
}