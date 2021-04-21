var config = require('../dbconfig');
const sql = require('mssql');
const ConsecutivosOps = require('./ConsecutivosOps');


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


    try {
        let pool = await sql.connect(config);
        let insertUsuarios = await pool.request()
            .input('NombreUsuario', sql.VarChar, username)
            .input('Nombre', sql.VarChar, nombre)
            .input('PrimerApellido', sql.VarChar, apellido1)
            .input('SegundoApellido', sql.VarChar, apellido2)
            .input('CorreoElectronico', sql.NVarChar, email)
            .input('Contraseña', sql.NVarChar, passwd)
            .input('CodigoRol', sql.Int, rol)
            .query('INSERT INTO Usuarios VALUES (@NombreUsuario, @Nombre, @PrimerApellido,@SegundoApellido, @CorreoElectronico, @Contraseña, @CodigoRol)');
        return insertUsuarios.recordsets
    } catch (err) {

        console.log('Error');
        console.log(err);
    }
}

async function validarUsuario(username, email) {

    try {

        let conn = await sql.connect(config);
        let validar = await conn.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .query('SELECT COUNT(*) AS CANTUSERS FROM USUARIOS WHERE NombreUsuario = @username OR CorreoElectronico = @email');

        let result = validar.recordset[0].CANTUSERS

        return result;

    } catch (error) {
        console.log(error)
    }

}

async function validarUsuarioLogin(email, passwd) {

    try {

        let conn = await sql.connect(config);

        let loggear = await conn.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, passwd)
            .query('SELECT COUNT(*) AS CANTUSERS FROM USUARIOS WHERE CorreoElectronico = @email AND Contraseña = @password');

        let result = loggear.recordset[0].CANTUSERS;

        return result

    } catch (error) {
        console.log(error)
    }

}

async function getEmailUsuario(email) {
    console.log("INICIANDO GET EMAIL USUARIO");
    try {

        console.log(email);
        let conn = await sql.connect(config);

        let emailUsuario = await conn.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM USUARIOS WHERE CorreoElectronico = @email');


        return emailUsuario.recordsets;

    } catch (error) {
        console.log(error)
    }
}

async function getRolUsuario(email) {

    try {
        let conn = await sql.connect(config);

        let sacarRol = await conn.request()
            .input('email', sql.VarChar, email)
            .query('SELECT CODIGOROL FROM USUARIOS WHERE CorreoElectronico = @email');

        let result = sacarRol.recordset[0].CODIGOROL

        return result;

    } catch (error) {
        console.log(error)
    }
}

async function updatePassUser(email, password) {
    console.log("UsuariosOps > updatePassUser > Email: " + email + " password: " + password)
    try {
        let pool = await sql.connect(config);
        let updatePass = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query('UPDATE USUARIOS SET Contraseña = @password WHERE CorreoElectronico = @email');
        return updatePass.recordsets
    } catch (err) {

        console.log('Error');
        console.log(err);
    }
}

async function updateRol(user, rol) {
    
    try {
        let pool = await sql.connect(config);
        let updateRoles = await pool.request()
            .input('user', sql.VarChar, user)
            .input('rol', sql.Int, rol)
            .query('UPDATE USUARIOS SET CodigoRol = @rol WHERE NombreUsuario = @user');  
            // .query('SELECT * FROM USUARIOS WHERE NombreUsuario = @user');  
        return updateRoles.recordsets
    } catch (err) {

        console.log('Error');
        console.log(err);
    }
}

module.exports = {
    getUsuarios: getUsuarios,
    getUsuario: getUsuario,
    addUsuario: addUsuario,
    validarUsuario: validarUsuario,
    validarUsuarioLogin: validarUsuarioLogin,
    getRolUsuario: getRolUsuario,
    getEmailUsuario: getEmailUsuario,
    updatePassUser: updatePassUser, 
    updateRol: updateRol
}