var config = require('../dbconfig');
const sql = require('mssql');


async function getUsuarios() {
    try {
        let pool = await sql.connect(config);
        let usuarios = await pool.request().query("SELECT * FROM Usuarios");
        return usuarios.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getUsuario(codigoUsuario) {
    try {
        let pool = await sql.connect(config);
        let usuario = await pool.request()
            .input('input_paramater', sql.VarChar, codigoUsuario)
            .query("SELECT * from Usuarios where NombreUsuario = @input_paramater");
        return usuario.recordsets;
    } catch (error) {
        console.log(error);
    }

}


async function addUsuario(usuario) {
    try {
        let pool = await sql.connect(config);
        let insertUsuarios = await pool.request()
            .input('NombreUsuario', sql.VarChar, usuario.NombreUsuario)
            .input('Nombre', sql.VarChar, usuario.Nombre)
            .input('PrimerApellido', sql.VarChar, usuario.PrimerApellido)
            .input('SegundoApellido', sql.VarChar, usuario.SegundoApellido)
            .input('CorreoElectronico', sql.NVarChar, usuario.CorreoElectronico)
            .input('Contraseña', sql.NVarChar, usuario.Contraseña)
            .input('PreguntaSeguridad', sql.VarChar, usuario.PreguntaSeguridad)
            .input('RespuestaSeguridad', sql.VarChar, usuario.RespuestaSeguridad)
            .input('CodigoRol', sql.Int, usuario.CodigoRol)
            .query('INSERT INTO Usuarios VALUES (@NombreUsuario, @Nombre, @PrimerApellido,@SegundoApellido, @CorreoElectronico, @Contraseña, @PreguntaSeguridad, @RespuestaSeguridad, @CodigoRol');
        return insertUsuarios.recordsets
    } catch (err) {

        console.log('Error');
        console.log(err);
    }

}

async function validarUsuario(username) {
    console.log('validando usuario.');
    try {

        let conn = await sql.connect(config);
        let validarUser = await conn.request()
            .input('username', sql.VarChar, username)
            .query('SELECT COUNT(*) AS CANTUSERS FROM USUARIOS WHERE NombreUsuario = @username');

        let result = validarUser.recordset[0].CANTUSERS
        console.log(result)
        return result

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getUsuarios: getUsuarios,
    getUsuario: getUsuario,
    addUsuario: addUsuario,
    validarUsuario: validarUsuario
}