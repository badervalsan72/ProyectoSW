class Boletos {
    constructor(Codigo, CodigoVuelo, NombreUsuario, Asiento, estadoBoleto) {
        this.Codigo = Codigo;
        this.CodigoVuelo = CodigoVuelo;
        this.NombreUsuario = NombreUsuario;
        this.Asiento = Asiento;
        this.estadoBoleto = estadoBoleto;
    }
}

module.exports = Boletos;