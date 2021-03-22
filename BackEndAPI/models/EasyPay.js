class EasyPay {
    constructor(NumCuenta, CodigoSeguridad, Contraseña, estadoTransaccion) {
        this.NumCuenta = NumCuenta;
        this.CodigoSeguridad = CodigoSeguridad;
        this.Contraseña = Contraseña;
        this.estadoTransaccion = estadoTransaccion;
    }
}

module.exports = EasyPay;