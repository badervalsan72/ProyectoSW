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


async function addUsuario(username, nombre, apellido1, apellido2, email, passwd, rol) {
    console.log(username, nombre, apellido1, apellido2, email, passwd, rol); 
    
    try {
        let pool = await sql.connect(config);
        let insertUsuarios = await pool.request()
            .input('NombreUsuario', sql.VarChar,username)
            .input('Nombre', sql.VarChar, nombre)
            .input('PrimerApellido', sql.VarChar, apellido1)
            .input('SegundoApellido', sql.VarChar,apellido2)
            .input('CorreoElectronico', sql.NVarChar,email)
            .input('Contraseña', sql.NVarChar,passwd)
            .input('CodigoRol', sql.Int, rol)
            .query('INSERT INTO Usuarios VALUES (@NombreUsuario, @Nombre, @PrimerApellido,@SegundoApellido, @CorreoElectronico, @Contraseña, @CodigoRol)');
        return insertUsuarios.recordsets
    } catch (err) {

        console.log('Error');
        console.log(err);
    }

}

async function validarUsuario(username, email) {
    console.log('validando usuario.');
    try {

        let conn = await sql.connect(config);
        let validar = await conn.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .query('SELECT COUNT(*) AS CANTUSERS FROM USUARIOS WHERE NombreUsuario = @username OR CorreoElectronico = @email');

        let result = validar.recordset[0].CANTUSERS
        console.log("username: " + username)
        console.log("email: " + email)
        console.log("Result: " + result)
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