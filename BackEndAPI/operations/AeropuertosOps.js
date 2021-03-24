var config = require('../dbconfig');
const sql = require('mssql');


async function getAeropuertos() {
    try {
        let pool = await sql.connect(config);
        let aeropuertos = await pool.request().query("SELECT * FROM AEROPUERTOS");
        return aeropuertos.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getAeropuerto(codigoAeropuerto) {
    try {
        let pool = await sql.connect(config);
        let aeropuerto = await pool.request()
            .input('input_paramater', sql.Int, codigoAeropuerto)
            .query("SELECT * from AEROPUERTOS where Codigo = @input_paramater");
        return aeropuerto.recordsets;
    } catch (error) {
        console.log(error);
    }

}


async function addAeropuerto(aeropuerto) {
    try {
        let pool = await sql.connect(config);
        let insertAeropuerto = await pool.request()
            .input('Codigo', sql.Int, aeropuerto.Codigo)
            .input('Nombre', sql.VarChar, aeropuerto.Nombre)
            .input('CodigoPais', sql.Int, aeropuerto.CodigoPais)
            .query('INSERT INTO Paises VALUES (@Codigo, @Nombre, @CodigoPais)');
        return insertAeropuerto.recordsets
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getAeropuertos: getAeropuertos,
    getAeropuerto: getAeropuerto,
    addAeropuerto: addAeropuerto
}