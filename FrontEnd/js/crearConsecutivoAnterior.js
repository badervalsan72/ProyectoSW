async function addConsecutivo() {

    let consecutivoID = document.getElementById('consecutivoID').value;
    let consecutivo = consecutivoID;
    let descripcion = document.getElementById('displaySelect').value;
    let poseePrefijo = document.getElementById('prefijo').checked;
    let poseeRango = document.getElementById('rango').checked;
    let rangoInicial;
    let rangoFinal;
    let prefijo;
    if (poseePrefijo) {
        prefijo = document.getElementById('lblPrefijo').value;
        consecutivoID = prefijo + "-" + consecutivoID;

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
    console.log(consecutivoID + " " + descripcion + " " + poseePrefijo + " " + prefijo + " " + poseeRango + " " + rangoInicial + " " + rangoFinal);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (poseePrefijo && poseeRango) {

        console.log("caso 1.");

        //********key*********/
        var key = CryptoJS.enc.Hex.parse('password');

        let encryptedConsecutivoID = CryptoJS.AES.encrypt(consecutivoID, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();

        let encrypteddescripcion = CryptoJS.AES.encrypt(descripcion, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();

        let encryptedprefijo = CryptoJS.AES.encrypt(prefijo, key, {
            mode: CryptoJS.mode.ECB,
        }).toString();

        var contenido = JSON.stringify({
            "consecutivoID": encryptedConsecutivoID,
            "consecutivo": consecutivo,
            "descripcion": encrypteddescripcion,
            "poseePrefijo": poseePrefijo,
            "prefijo": encryptedprefijo,
            "poseeRango": poseeRango,
            "rangoInicial": rangoInicial,
            "rangoFinal": rangoFinal

        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: contenido,

        };

        let resulted = await fetch("http://localhost:8090/api/Consecutivos1", requestOptions)
            .then(response => response.text())
            .then(result => result.toString())
            .catch(error => console.log('error', error))

        alert('consecutivo creado exitosamente.');
        

    } else if (poseePrefijo && !poseeRango) {

    } else if (!poseePrefijo && poseeRango) {

    } else {


    }
    window.location = '/FrontEnd/consecutivos.html'; 

}