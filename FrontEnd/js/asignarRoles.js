async function asignarRoles() {
    let result;
    await fetch("http://localhost:8090/api/Usuarios")
        .then(response => response.json())
        .then(data => result = data)
        .catch(error => console.log('error', error))

    var tbl = document.getElementById('usuarios');
    var key = CryptoJS.enc.Hex.parse('password');

    for (var i = 0; i < result.length; i++) {
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        // td3 va a ser un checkbox y luego se van a sacar los usuarios con el checkbox marcado para hacer el update 

        var usernameEnc = result[i]["NombreUsuario"];

        var username = CryptoJS.AES.decrypt(usernameEnc, key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        var rol = result[i]["CodigoRol"];

        td1.appendChild(document.createTextNode(username));
        tr.appendChild(td1);

        td2.appendChild(document.createTextNode(rol));
        tr.appendChild(td2);

        var input = document.createElement('input');
        var att_input_type = document.createAttribute("type");
        att_input_type.value = "checkbox";
        input.setAttributeNode(att_input_type);
        

        tbl.appendChild(tr);


    }
}