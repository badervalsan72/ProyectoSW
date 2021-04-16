async function getPaises() {
    let result;
    await fetch("http://localhost:8090/api/Paises")
        .then(response => response.json())
        .then(data => result = data)
        .catch(error => console.log('error', error))

    var tbl = document.getElementById('paises');
    var key = CryptoJS.enc.Hex.parse('password');

    for (var i = 0; i < result.length; i++) {
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');


        var codigoTemp = result[i]['Codigo'];

        var codigoPais = CryptoJS.AES.decrypt(codigoTemp, key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        console.log("Original: " + codigoTemp + " Decriptado: " + codigoPais);

        var nombrePais = CryptoJS.AES.decrypt((result[i]['Nombre']), key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        /* 
        var imgPais = CryptoJS.AES.decrypt((result[0]['Nombre']), key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);
        
        var imgPais = CryptoJS.AES.decrypt(localStorage.getItem("imagen"), key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        */

        var imgPais = (result[i]['imgPais']);

        td1.appendChild(document.createTextNode(codigoPais));
        tr.appendChild(td1);

        td2.appendChild(document.createTextNode(nombrePais));
        tr.appendChild(td2);

        td3.appendChild(document.createTextNode(imgPais));
        tr.appendChild(td3);

        var att_td4_id = document.createAttribute("id");
        att_td4_id.value = i + 1;
        td4.setAttributeNode(att_td4_id);

        var att_td4_class = document.createAttribute("class");
        att_td4_class.value = "center";
        td4.setAttributeNode(att_td4_class);

        var btn = document.createElement('button');
        var att_btn_class = document.createAttribute("class");
        att_btn_class.value = 'btnDesign';
        btn.setAttributeNode(att_btn_class);

        var att_btn_onclick = document.createAttribute("onclick");
        att_btn_onclick.value = "editarPais('" + codigoPais + "')";
        btn.setAttributeNode(att_btn_onclick);

        btn.appendChild(document.createTextNode("Editar"));
        td4.appendChild(btn);
        tr.appendChild(td4);

        tbl.appendChild(tr);
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let paisesDescripcion = CryptoJS.AES.encrypt("paises", key, {
        mode: CryptoJS.mode.ECB,
    }).toString();

    var contenido = JSON.stringify({
        "descripcion": paisesDescripcion
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: contenido,

    };
    let result2;
    console.log("paises linea 78");
    await fetch('http://localhost:8090/api/getConsecutivoDescripcion', requestOptions)
        .then(response => response.json())
        .then(data => result2 = data);


    var drp = document.getElementById('displaySelect');
    for (var i = 0; i < result2.length; i++) {
        var opt = document.createElement('option');
        opt.value = result2[i]['ConsecutivoID'];
        console.log(result2[i]['ConsecutivoID']);


        let conid = CryptoJS.AES.decrypt((result2[i]['ConsecutivoID']), key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);


        opt.appendChild(document.createTextNode(conid));
        drp.appendChild(opt);
    }
}

async function addPais() {
    let consecutivo = document.getElementById("displaySelect").value;
    let identificador = document.getElementById("identificador").value;
    let nPais = document.getElementById("pais").value;
    let imgPais = localStorage.getItem("imagen");
    var key = CryptoJS.enc.Hex.parse('password');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (imgPais == "default.png") {
        alert("debe insertar una imagen para poder agregar el pais");
    }

    var contenido = JSON.stringify({
        "consecutivoID": consecutivo
    });


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: contenido,

    };
    let consecutivosresult;
    await fetch('http://localhost:8090/api/getConsecutivo', requestOptions)
        .then(response => response.json())
        .then(data => consecutivosresult = data);

    if (identificador > 0) {
        if (consecutivosresult[0]['PoseeRango']) {

            let min = consecutivosresult[0]['RangoInicial'];
            let max = consecutivosresult[0]['RangoFinal'];


            if (identificador > max || identificador < min) {

                alert('valor de identificador fuera de rango.');
                return;

            }

        }

        let consecutivoDec = CryptoJS.AES.decrypt(consecutivo, key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        let consecutivoPais = consecutivoDec + identificador;

        let consecutivoPaisEnc = CryptoJS.AES.encrypt(consecutivoPais, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();

        let nPaisEnc = CryptoJS.AES.encrypt(nPais, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();

        var contenidoGetPaises = JSON.stringify({
            "Codigo": consecutivoPaisEnc,
            "Nombre": nPaisEnc
        });

        var requestOptionsGetPaises = {
            method: 'POST',
            headers: myHeaders,
            body: contenidoGetPaises,

        };
        let getPaisNCsresult = await fetch('http://localhost:8090/api/getPaisNC', requestOptionsGetPaises)
            .then(response => response.text())
            .then(result => result.toString())
            .catch(error => console.log('error', error))

        if (getPaisNCsresult[0] == 0) {

            var contenidoAddPais = JSON.stringify({
                "Codigo": consecutivoPaisEnc,
                "Nombre": nPaisEnc,
                "ImgPais": imgPais // subir imagen 
            });

            var requestOptionsAddPais = {
                method: 'POST',
                headers: myHeaders,
                body: contenidoAddPais,
            };
            let addPaisResult = await fetch('http://localhost:8090/api/addPais', requestOptionsAddPais)
                .then(response => response.text())
                .then(result => result.toString())
                .catch(error => console.log('error', error))

            alert("pais agregado." + imgPais);
            window.location = '/FrontEnd/paises.html';


        } else {
            alert("El país o el identificador ingresado ya existe!");
        }


    } else {
        alert('Identificador no puede ser menor o igual a 0.');

    }
}

function editarPais(codigoPais) {
    localStorage.setItem('codigoPais', codigoPais);
    window.location = '/Frontend/editarPaises.html';
}

function cargarImagen() {
    let inputFile = document.getElementById("inputFile");
    let btnCargar = document.getElementById("btnCargar");
    let imageSpace = document.getElementById("custom-space");

    btnCargar.addEventListener("click", function() {
        inputFile.click();
    });

    inputFile.addEventListener("change", function() {
        //  Format Selected File Text
        if (inputFile.value) {
            imageSpace.innerHTML = inputFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
            localStorage.setItem("imagen", inputFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);

        } else {
            localStorage.setItem("imagen", "default.jpg"); // DEBE SER NULL 
            imageSpace.innerHTML = "No File, Selected!";
        }

        // Image Preview
        const files = inputFile.files[0]; //files[0] - For getting first file TIENE LA IMAGEN
        //   console.log(files);

        console.log("tipo de files en la imagen: " + typeof(files));

        if (files) {
            // Showing Image and Hiding "Image Preview" Text
            document.getElementById("preview_img").style.display = "block";
            document.getElementById("preview_text").style.display = "none";
            //Read File
            const fileReader = new FileReader();

            fileReader.addEventListener("load", function() {
                // convert image to base64 encoded string
                document.getElementById("preview_img").setAttribute("src", this.result);
                console.log("resultado = " + this.result);
            });
            fileReader.readAsDataURL(files);
        }
    });
}




window.onload = getPaises;