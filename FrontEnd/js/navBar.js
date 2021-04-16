const getRol = async function(TheUrl, email) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var key = CryptoJS.enc.Hex.parse('password');
    let encryptedEmail = CryptoJS.AES.encrypt(email, key, {
        mode: CryptoJS.mode.ECB,
    }).toString();

    var contenido = JSON.stringify({
        "email": encryptedEmail,
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


async function iniciar() {


    if (sessionStorage.getItem('email') == null) {

        // nueva sesion sin usuario 
        $("#DivContent").load("Navbars/NavBarGeneral.html");


    }
    // $("#DivContent").load("Navbars/NavBarAdministrador.html");
    else {
        let result = await getRol('http://localhost:8090/api/Usuarios/getRolUsuario', sessionStorage.getItem('email'))
            .catch(error => console.log('error', error))

        switch (result) {

            case '1': // Administrador 
                $("#DivContent").load("Navbars/NavBarAdministrador.html");

                break;

            case '2': // Seguridad
                $("#DivContent").load("Navbars/NavBarSeguridad.html");
                break;

            case '3': // Consecutivo 
                $("#DivContent").load("Navbars/NavBarAdministrador.html");
                break;

            case '4': // Mantenimiento 
                $("#DivContent").load("Navbars/NavBarGeneral.html");
                break;

            case '5': // Consulta 
                $("#DivContent").load("Navbars/NavBarConsulta.html");
                break;

            case '6': // Default
                $("#DivContent").load("Navbars/NavBarCliente.html");
                //alert("Por favor, contactar con los administradores para que le asignen un rol");
                break;

            default:

                break;
        }

    }
}
window.onload = iniciar;