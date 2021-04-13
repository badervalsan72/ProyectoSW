async function addConsecutivo() {

    let consecutivoID = document.getElementById('consecutivoID').value;
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

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (poseePrefijo && poseeRango) {

        //encritar acui

        var contenido = JSON.stringify({
            "consecutivoID": consecutivoID,
            "descripcion": descripcion,
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

        let resulted = await fetch("http://localhost:8090/api/addConsecutivo1", requestOptions)
            .then(response => response.text())
            .then(result => result.toString())
            .catch(error => console.log('error', error))


    } else if (poseePrefijo && !poseeRango) {

    } else if (!poseePrefijo && poseeRango) {

    } else {


    }







}