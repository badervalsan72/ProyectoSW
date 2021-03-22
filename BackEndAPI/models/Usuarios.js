class Usuarios {
    constructor(NombreUsuario, Nombre, PrimerApellido, SegundoApellido, CorreoElectronico, Contraseña, PreguntaSeguridad, RespuestaSeguridad, CodigoRol) {
        this.NombreUsuario = NombreUsuario;
        this.Nombre = Nombre;
        this.PrimerApellido = PrimerApellido;
        this.SegundoApellido = SegundoApellido;
        this.CorreoElectronico = CorreoElectronico;
        this.Contraseña = Contraseña;
        this.PreguntaSeguridad = PreguntaSeguridad;
        this.RespuestaSeguridad = RespuestaSeguridad;
        this.CodigoRol = CodigoRol;
    }
}

module.exports = Usuarios;