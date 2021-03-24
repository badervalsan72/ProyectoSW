var config = require('../dbconfig');
const sql = require('mssql');


async function getRoles() {
    try {
        let pool = await sql.connect(config);
        let roles = await pool.request().query("SELECT * FROM ROLES");
        return roles.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getRol(codigoRol) {
    try {
        let pool = await sql.connect(config);
        let rol = await pool.request()
            .input('input_paramater', sql.Int, codigoRol)
            .query("SELECT * from Roles where Codigo = @input_paramater");
        return rol.recordsets;
    } catch (error) {
        console.log(error);
    }

}


async function addRol(rol) {
    try {
        let pool = await sql.connect(config);
        let insertRol = await pool.request()
            .input('Codigo', sql.Int, rol.Codigo)
            .input('Descripcion', sql.VarChar, rol.Nombre)
            .query('INSERT INTO ROLES VALUES (@Codigo, @Descripcion)')
        return insertRol.recordsets
    } catch (err) {

        console.log('Error');
        console.log(err);
    }

}

module.exports = {
    getRoles: getRoles,
    getRol: getRol,
    addRol: addRol
}