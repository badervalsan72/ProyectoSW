async function getConsecutivos() {
    console.log("hello")
    let result;
    await fetch("http://localhost:8090/api/Consecutivos")
        .then(response => response.json())
        .then(data => result = data);

    var tbl = document.getElementById('consecutivos');
    for (var i = 0; i < result.length; i++) {

        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');

        var key = CryptoJS.enc.Hex.parse('password');

        var consecutivoID = result[i]['ConsecutivoID'];
        consecutivoID = CryptoJS.AES.decrypt(consecutivoID, key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        var descripcionDC = result[i]['Descripcion'];
        descripcionDC = CryptoJS.AES.decrypt(descripcionDC, key, {
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Latin1);

        td1.appendChild(document.createTextNode(consecutivoID))
        tr.appendChild(td1);

        td2.appendChild(document.createTextNode(descripcionDC))
        tr.appendChild(td2);

        td3.appendChild(document.createTextNode(result[i]['Consecutivo']))
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
        att_btn_onclick.value = "editarConsecutivo('" + consecutivoID + "')";
        btn.setAttributeNode(att_btn_onclick);

        btn.appendChild(document.createTextNode("Editar"));
        td4.appendChild(btn);
        tr.appendChild(td4);

        tbl.appendChild(tr);
    }
    console.log("goodbye")
}
// tbl.appendChild(tbdy);


function editarConsecutivo(consecutivoID) {
    localStorage.setItem('consecutivoID', consecutivoID);
    window.location = '/Frontend/editarconsecutivo.html';
}



window.onload = getConsecutivos;