async function getPaises() {
    let result;
    await fetch("http://localhost:8090/api/Paises")
        .then(response => response.json())
        .then(data => result = data)

    var tbl = document.getElementById('paises');
    for (var i = 0; i < result.length; i++) {
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');

        
    }
}
window.onload = getPaises;  