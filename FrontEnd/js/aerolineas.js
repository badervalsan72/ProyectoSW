async function getAerolineas() {
    let result;
    await fetch("http://localhost:8090/api/getAerolineas")
        .then(response => response.json())
        .then(data => result = data)
        .catch(error => console.log('error', error))

    var tbl = document.getElementById('aerolineas');
    var key = CryptoJS.enc.Hex.parse('password');

    for (var i = 0; i < result.length; i++) {
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');


        var codigoTemp = result[i]['Codigo'];

        var codigoAerolinea = CryptoJS.AES.decrypt(codigoTemp, key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        var nombreAgencia = CryptoJS.AES.decrypt((result[i]['NombreAgencia']), key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);


        var mgAgencia = CryptoJS.AES.decrypt((result[i]['ImgAgencia']), key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        var paisOrigen = CryptoJS.AES.decrypt((result[i]['PaisOrigen']), key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);


        td1.appendChild(document.createTextNode(codigoAerolinea));
        tr.appendChild(td1);

        td2.appendChild(document.createTextNode(nombreAgencia));
        tr.appendChild(td2);

        td3.appendChild(document.createTextNode(imgAgencia));
        tr.appendChild(td3);

        td4.appendChild(document.createTextNode(paisOrigen));
        tr.appendChild(td4);

        tbl.appendChild(tr);
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let aerolineasDescripcion = CryptoJS.AES.encrypt("aerolineas", key, {
        mode: CryptoJS.mode.ECB,
    }).toString();

    var contenido = JSON.stringify({
        "descripcion": aerolineasDescripcion
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