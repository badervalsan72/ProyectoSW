class Tarjetas {
    constructor(NumTarjeta, mesExp, añoExp, ccv, monto, tipo) {
        this.NumTarjeta = NumTarjeta;
        this.mesExp = mesExp;
        this.añoExp = añoExp;
        this.ccv = ccv;
        this.monto = monto;
        this.tipo = tipo;
    }
}

module.exports = Tarjetas;