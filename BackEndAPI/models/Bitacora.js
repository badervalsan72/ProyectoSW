class Bitacora {
    constructor(Codigo, Fecha, NombreUsuario, Tipo, CodigoRegistro, Descripcion, RegistroDetalle) {
        this.Codigo = Codigo;
        this.Fecha = Fecha;
        this.NombreUsuario = NombreUsuario;
        this.Tipo = Tipo;
        this.CodigoRegistro = CodigoRegistro;
        this.Descripcion = Descripcion;
        this.RegistroDetalle = RegistroDetalle;
    }
}

module.exports = Bitacora;