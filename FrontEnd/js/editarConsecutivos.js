async function cargarConsecutivo() {
    let consecutivo = document.getElementById('consecutivo');
    let consecutivonum = document.getElementById('consecutivonum');
    let descripcion = document.getElementById('descripcion');
    let poseePrefijo = document.getElementById('prefijo');
    let prefijo = document.getElementById('lblPrefijo');
    let poseeRango = document.getElementById('rango');
    let rangoInicial = document.getElementById('lblRangoInicial');
    let rangoFinal = document.getElementById('lblRangoFinal');

    let consecutivoID = localStorage.getItem('consecutivoID');

    consecutivo.value = consecutivoID;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var key = CryptoJS.enc.Hex.parse('password');

    let encryptedConsecutivoID = CryptoJS.AES.encrypt(consecutivoID, key, {
        mode: CryptoJS.mode.ECB,
    }).toString();

    console.log('linea 17 ' + encryptedConsecutivoID);
    var contenido = JSON.stringify({
        "consecutivoID": encryptedConsecutivoID
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: contenido,

    };


    let result;
    await fetch('http://localhost:8090/api/getConsecutivo', requestOptions)
        .then(response => response.json())
        .then(data => result = data);


    // let descrip = result[0]['Descripcion'];



    descripcion.value = CryptoJS.AES.decrypt((result[0]['Descripcion']), key, {
        mode: CryptoJS.mode.ECB,
    }).toString(CryptoJS.enc.Latin1);;

    poseePrefijo.checked = result[0]['PoseePrefijo'];


    prefijo.value = CryptoJS.AES.decrypt((result[0]['Prefijo']), key, {
        mode: CryptoJS.mode.ECB,
    }).toString(CryptoJS.enc.Latin1);;


    poseeRango.checked = result[0]['PoseeRango'];

    rangoInicial.value = result[0]['RangoInicial'];

    rangoFinal.value = result[0]['RangoFinal'];

    consecutivonum.value = result[0]['Consecutivo'];
}

async function updateConsecutivo() {
    let consecutivoID = document.getElementById('consecutivo').value;
    let consecutivo = document.getElementById('consecutivonum').value;
    let descripcion = document.getElementById('descripcion').value;
    let poseePrefijo = document.getElementById('prefijo').checked;
    let prefijo = null;
    let poseeRango = document.getElementById('rango').checked;
    let rangoInicial = null;
    let rangoFinal;
    var key = CryptoJS.enc.Hex.parse('password');

    if (poseePrefijo) {
        prefijo = document.getElementById('lblPrefijo').value;
        consecutivoID = prefijo + "-" + consecutivo;

        prefijo = CryptoJS.AES.encrypt(prefijo, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();

    }

    if (poseeRango) {
        rangoInicial = document.getElementById('lblRangoInicial').value;
        rangoFinal = document.getElementById('lblRangoFinal').value;
        console.log(rangoInicial + " " + rangoFinal);

        if (rangoInicial >= rangoFinal || rangoInicial <= 0) {
            alert('El rango inicial debe ser mayor al rango final y debe ser mayor a 0');
            return;

        }
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");



    console.log("caso 1.");

    //********key*********/


    let encryptedConsecutivoID = CryptoJS.AES.encrypt(consecutivoID, key, {
        mode: CryptoJS.mode.ECB,
    }).toString();

    let oldConsecutivoID = localStorage.getItem('consecutivoID');


    let oldConsecutivoIDEnc = CryptoJS.AES.encrypt(oldConsecutivoID, key, {
        mode: CryptoJS.mode.ECB,
    }).toString();

    let encrypteddescripcion = CryptoJS.AES.encrypt(descripcion, key, {
        mode: CryptoJS.mode.ECB,
    }).toString();



    var contenido = JSON.stringify({
        "oldConsecutivoID": oldConsecutivoIDEnc,
        "consecutivoID": encryptedConsecutivoID,
        "consecutivo": consecutivo,
        "descripcion": encrypteddescripcion,
        "poseePrefijo": poseePrefijo,
        "prefijo": prefijo,
        "poseeRango": poseeRango,
        "rangoInicial": rangoInicial,
        "rangoFinal": rangoFinal

    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: contenido,

    };

    let resulted = await fetch("http://localhost:8090/api/updateConsecutivo", requestOptions)
        .then(response => response.text())
        .then(result => result.toString())
        .catch(error => console.log('error', error))

    alert('consecutivo creado exitosamente.');

    window.location = '/FrontEnd/consecutivos.html';
}

window.onload = cargarConsecutivo;