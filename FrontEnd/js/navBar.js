const getRol = async function(TheUrl, email) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var contenido = JSON.stringify({
        "email": email,
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
                break;

            case '4': // Mantenimiento 
                break;

            case '5': // Consulta 
                $("#DivContent").load("Navbars/NavBarConsulta.html");
                break;

            default:

                break;
        }

    }
}
window.onload = iniciar;