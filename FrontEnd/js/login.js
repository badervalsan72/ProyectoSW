const validarUserLogin = async function(TheUrl, email, passwd) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var key = CryptoJS.enc.Hex.parse('password');
    let encryptedEmail = CryptoJS.AES.encrypt(email, key, {
        mode: CryptoJS.mode.ECB,
    }).toString();
    let encryptedPass = CryptoJS.AES.encrypt(passwd, key, {
        mode: CryptoJS.mode.ECB,
    }).toString();

    var contenido = JSON.stringify({
        "email": encryptedEmail,
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

    var key = CryptoJS.enc.Hex.parse('password');

    let result = await validarUserLogin('http://localhost:8090/api/Usuarios/validarUsuarioLogin', email, passwd);

    if (result > 0) {
        sessionStorage.setItem('email', email)
        window.location = '/Frontend/index.html';

    } else {
        alert("usuario o contraseña incorrectos. "); 
    }
}