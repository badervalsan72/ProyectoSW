function CalcularMontoMiami(){

    //Variables para realizar los calculos
    var salidaMiami = document.getElementById('salidaMiami').value;
    var retornoMiami = document.getElementById('retornoMiami').value;
    var pasajerosMiami = document.getElementById('pasajerosMiami').value;
    var totalMiami;

    var arrayMiami = ["a9aa56r", "ap98gao", "ke9!ah9", "p/3j6c1", "po.abt8"]
    
    if (salidaMiami == 0 || retornoMiami == 0 || pasajerosMiami == 0 || salidaMiami == null || retornoMiami == null || pasajerosMiami == null){
        alert("Ingrese todos los valores");
    } else {
        var item = arrayMiami[Math.floor(Math.random() * items.length)];
        totalMiami = pasajerosMiami * 700;
        document.getElementById('reservaMiami').value = 4;
        document.getElementById('idMiami') = item;
        document.getElementById('totalMiami').value = "$" + totalMiami;
    }
}

function CalcularMontoPanama(){

    //Variables para realizar los calculos
    var salidaPanama = document.getElementById('salidaPanama');
    var retornoPanama = document.getElementById('retornoPanama');
    var pasajerosPanama = document.getElementById('pasajerosPanama');
    var totalPanama;

    var arrayPanama = [".pjb47g", "0l.k7pa", "ap4k5m2", "/lpabys8", "l,ah561"]
    
    if (salidaPanama == 0 || retornoPanama == 0 || pasajerosPanama == 0 || salidaPanama == null || retornoPanama == null || pasajerosPanama == null){
        alert("Ingrese todos los valores");
    } else {
        var item = arrayPanama[Math.floor(Math.random() * items.length)];
        totalPanama = pasajerosPanama * 400;
        document.getElementById('reservaMiami').value = 4;
        document.getElementById('idMiami') = item;
        document.getElementById('totalMiami').value = "$" + totalPanama;
    }

}

function CalcularMontoNuevaYork(){

    //Variables para realizar los calculos
    var salidaNuevaYork = document.getElementById('salidaNuevaYork');
    var retornoNuevYork = document.getElementById('retornoPanama');
    var pasajerosNuevaYork = document.getElementById('pasajerosNuevaYork');
    var totalNuevaYork;

    var arrayNuevaYork = ["pl,16ha", ".13h356q", "lk0ag35", "pw77u89", "mha.l97j"]
    
    if (salidaNuevaYork == 0 || retornoNuevYork == 0 || pasajerosNuevaYork == 0 || salidaNuevaYork == null || retornoNuevYork == null || pasajerosNuevaYork == null){
        alert("Ingrese todos los valores");
    } else {
        var item = arrayNuevaYork[Math.floor(Math.random() * items.length)];
        totalNuevaYork = pasajerosNuevaYork * 700;
        document.getElementById('reservaMiami').value = 4;
        document.getElementById('idMiami') = item;
        document.getElementById('totalMiami').value = "$" + totalNuevaYork;
    }
}

function CalcularMontoMexico(){

    //Variables para realizar los calculos
    var salidaMexico = document.getElementById('salidaMexico');
    var retornoMexico = document.getElementById('retornoMexico');
    var pasajerosMexico = document.getElementById('pasajerosMexico');
    var totalMexico;

    var arrayMiami = ["a9aa56r", "ap98gao", "ke9!ah9", "p/3j6c1", "po.abt8"]
    
    if (salidaMiami == 0 || retornoMiami == 0 || pasajerosMiami == 0 || salidaMiami == null || retornoMiami == null || pasajerosMiami == null){
        alert("Ingrese todos los valores");
    } else {
        var item = arrayMiami[Math.floor(Math.random() * items.length)];
        totalMiami = pasajerosMiami * 700;
        document.getElementById('reservaMiami').value = 4;
        document.getElementById('idMiami') = item;
        document.getElementById('totalMiami').value = "$" + totalMiami;
    }
}

function CalcularMontoNicaragua(){

    //Variables para realizar los calculos
    var salidaNicaragua = document.getElementById('salidaNicaragua');
    var retornoNicaragua = document.getElementById('retornoNicaragua');
    var pasajerosNicaragua = document.getElementById('pasajerosNicaragua');
    var totalNicaragua;

    var arrayMiami = ["a9aa56r", "ap98gao", "ke9!ah9", "p/3j6c1", "po.abt8"]
    
    if (salidaMiami == 0 || retornoMiami == 0 || pasajerosMiami == 0 || salidaMiami == null || retornoMiami == null || pasajerosMiami == null){
        alert("Ingrese todos los valores");
    } else {
        var item = arrayMiami[Math.floor(Math.random() * items.length)];
        totalMiami = pasajerosMiami * 700;
        document.getElementById('reservaMiami').value = 4;
        document.getElementById('idMiami') = item;
        document.getElementById('totalMiami').value = "$" + totalMiami;
    }
}

function limpiar(){
    document.getElementById('reservaMiami').value = "";
    document.getElementById('idMiami').value = "";
    document.getElementById('totalMiami').value = "";

    document.getElementById('reservaPanama').value = "";
    document.getElementById('idPanama').value = "";
    document.getElementById('totalPanama').value = "";

    document.getElementById('reservaNuevaYork').value = "";
    document.getElementById('idNuevaYork').value = "";
    document.getElementById('totalNuevaYork').value = "";

    document.getElementById('reservaMexico').value = "";
    document.getElementById('idMexico').value = "";
    document.getElementById('totalMexico').value = "";

    document.getElementById('reservaNicaragua').value = "";
    document.getElementById('idNicaragua').value = "";
    document.getElementById('totalNicaragua').value = "";

}