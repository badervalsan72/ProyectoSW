async function asignarRoles() {    
    let result;
    await fetch("http://localhost:8090/api/Usuarios")
        .then(response => response.json())
        .then(data => result = data)
        .catch(error => console.log('error', error))

    var tbl = document.getElementById('roles');
    var key = CryptoJS.enc.Hex.parse('password');

    for (var i = 0; i < result.length; i++) {
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        

        var usernameEnc = result[i]["NombreUsuario"];

        var username = CryptoJS.AES.decrypt(usernameEnc, key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        var rol = result[i]["CodigoRol"];

        td1.appendChild(document.createTextNode(username));
        tr.appendChild(td1);

        td2.appendChild(document.createTextNode(rol));
        tr.appendChild(td2);

        var input = document.createElement('input'); // td3 va a ser un checkbox y luego se van a sacar los usuarios con el checkbox marcado para hacer el update 
        
        var att_input_name = document.createAttribute("name");
        att_input_name.value = "usersCheck";
        input.setAttributeNode(att_input_name); 


        var att_input_type = document.createAttribute("type");
        att_input_type.value = "checkbox";
        input.setAttributeNode(att_input_type);


        var att_input_id = document.createAttribute("id"); 
        att_input_id.value = usernameEnc; 
        input.setAttributeNode(att_input_id);

        var att_input_class = document.createAttribute("class");
        att_input_class.value = "inputCheckbox";
        input.setAttributeNode(att_input_class); 

        td3.appendChild(input); 
        tr.appendChild(td3); 

        tbl.appendChild(tr);


    }
}

async function updateRolesUsers() {
    let users = document.getElementsByName("usersCheck"); 
    let usersChecked = []
    for (let i = 0; i < users.length; i++) {
        if (users[i].checked) {
            usersChecked.push((users[i].id).toString()); 
        }

    } 



    var roles = document.getElementsByName("radioroles");
    var selectedRol = null;

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].checked) { 
            selectedRol = roles[i].value;
        }
    }

    if (selectedRol == null) {
        alert("por favor seleccione un rol. "); 
        return; 

    }

    if (usersChecked.length == 0) {
        alert("por favor seleccione al menos un usuario. "); 
    }
    else { 
        // hacer update 

        var key = CryptoJS.enc.Hex.parse('password');
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        
        for (let i = 0; i < usersChecked.length; i++) {
            
            
            
            
            var contenido = JSON.stringify({
                "user": usersChecked[i], 
                "rol": selectedRol
    
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: contenido,
        
            };
            
            await fetch('http://localhost:8090/api/Usuarios/updateRol', requestOptions)
            .then(response => response.json())
            
            
            
        }
        
       

        alert("cambio de roles exitoso. "); 
        window.location = "/Frontend/asignarroles.html"; 

    }
    

    
    
    
    // console.log(usersChecked.toString()); 

}

window.onload = asignarRoles; 