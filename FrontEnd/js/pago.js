function pagoReservacion() {
    let numero = document.getElementById("numero").value;
    let titular = document.getElementById("titular").value;
    let fecha = document.getElementById("fecha").value;
    let cvv = document.getElementById("cvv").value;
    let reserva = document.getElementById("reserva").value;

    if (numero == "4263982640269299" && titular == "Francisco Muñoz" && fecha == "07/23" && cvv == 590) {
        alert("pago exitoso.");
    } else {
        alert("Datos no registrados.");
    }
}