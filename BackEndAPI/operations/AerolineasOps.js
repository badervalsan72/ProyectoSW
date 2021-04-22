var config = require('../dbconfig');
const sql = require('mssql');
const Aerolineas = require('../models/Aerolineas');

async function addAerolinea(codigo, nombreAgencia, imgAgencia, paisOrigen) {
    try {
        let pool = await sql.connect(config);
        let insertAerolinea = await pool.request()
            .input('Codigo', sql.VarChar, codigo)
            .input('nombreAgencia', sql.VarChar, nombreAgencia)
            .input('CodigoAeropuerto', sql.VarChar, imgAgencia)
            .input('PaisOrigen', sql.VarChar, paisOrigen)
            .query('INSERT INTO Aerolineas VALUES (@Codigo, @nombreAgencia, @NombreAgencia, @PaisOrigen)')
        return insertAerolinea.recordsets
    } catch (error) {
        console.log(error);
    }
}


//falta cambiar este a aerolineas
async function getAerolinea(codigo) {
    try {
        console.log("codigo " + codigo);
        let pool = await sql.connect(config);
        let pais = await pool.request()
            .input('codigo', sql.VarChar, codigo)
            .query("SELECT * from AEROLINEAS where Codigo = @codigo");
        return pais.recordset[0];
    } catch (error) {
        console.log(error);
    }
}


//falta un metodo que permita pedir todas las aerolineas
async function getAerolineas() {
    try {
        let pool = await sql.connect(config);
        let aerolineas = await pool.request().query("SELECT * FROM AEROLINEAS");
        return aerolineas.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addAerolinea: addAerolinea,
    getAerolinea: getAerolinea
}