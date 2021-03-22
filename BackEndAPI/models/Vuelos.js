class Vuelos {
    constructor(Codigo, CodigoAerolinea, CodigoOrigen, CodigoDestino, fecha, hora, estado, CodigoPuerta) {
        this.Codigo = Codigo;
        this.CodigoAerolinea = CodigoAerolinea;
        this.CodigoOrigen = CodigoOrigen;
        this.CodigoDestino = CodigoDestino;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
        this.CodigoPuerta = CodigoPuerta;
    }
}

module.exports = Vuelos;