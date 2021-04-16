async function cambiarContraseña() {
    email = document.getElementById("email").value;
    oldPass = document.getElementById("oldPwd").value;
    newPass = document.getElementById("newPwd").value;
    repeatedNewPass = document.getElementById("repeatedNewPwd").value;

    console.log("inicio de cambiar contraseña");

    var key = CryptoJS.enc.Hex.parse('password');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    let encryptedEmail = CryptoJS.AES.encrypt(email, key, {
        mode: CryptoJS.mode.ECB,
    }).toString();




    var contenido = JSON.stringify({
        "email": encryptedEmail
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: contenido,
    };

    console.log("encryptedEmail " + encryptedEmail);

    var resultedEmail;
    await fetch('http://localhost:8090/api/Usuarios/getEmailUsuario', requestOptions)
        .then(response => response.json())
        .then(data => resultedEmail = data)
        .catch(error => console.log('error', error));

    console.log("despues del primer post");

    console.log("resultedEmail: " + resultedEmail[0]['CorreoElectronico']);

    if (!(resultedEmail[0]['CorreoElectronico'] == null)) {

        console.log("el correo no es nulo");

        console.log("resultedEmail: " + resultedEmail[0]['CorreoElectronico']);

        //var key = CryptoJS.enc.Hex.parse('password');

        var decryptedEmail = CryptoJS.AES.decrypt((resultedEmail[0]['CorreoElectronico']), key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        var decryptedPass = CryptoJS.AES.decrypt((resultedEmail[0]['Contraseña']), key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        console.log("decriptacion de las varas del post");

        if (oldPass == decryptedPass) {

            console.log("la contraseña vieja es igual a la vieja")

            if (newPass == repeatedNewPass) {

                console.log("la contraseña nueva es igual a la repetida")

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                let encryptedEmail = CryptoJS.AES.encrypt(email, key, {
                    mode: CryptoJS.mode.ECB,
                }).toString();

                let encryptedPass = CryptoJS.AES.encrypt(newPass, key, {
                    mode: CryptoJS.mode.ECB,
                }).toString();

                var contenido = JSON.stringify({
                    "email": encryptedEmail,
                    "contraseña": encryptedPass
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: contenido,

                };

                let result2;
                await fetch('http://localhost:8090/api/Usuarios/getEmailUsuario', requestOptions)
                    .then(response => response.json())
                    .then(data => result2 = data)
                    .catch(error => console.log('error', error));

                console.log("linea 99, despues del segundo post, el que hace update");

                if (confirm("Contraseña actualizada correctamente")) {
                    window.location = '/Frontend/index.html';
                }

            } else {
                console.log("La contraseña nueva y la repetida no son iguales");
                //alert("La contraseña nueva y la repetida no son iguales");
            }
        } else {
            console.log("La contraseña antigua no coincide con la verdaderamente antigua");
            //alert("La contraseña antigua no coincide con la verdaderamente antigua");
        }
    } else {
        console.log("el correo es nulo");
        //alert("El correo electrónico no existe en la base de datos");
    }
}

async function cancelarCambio() {
    if (confirm("Desea cancelar el cambio de contraseña?")) {
        window.location = '/Frontend/index.html';
    } else {
        window.location = '/Frontend/cambiarContraseña.html';
    }
}