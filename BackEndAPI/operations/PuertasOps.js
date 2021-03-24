var config = require('../dbconfig');
const sql = require('mssql');


async function getPuertas() {
    try {
        let pool = await sql.connect(config);
        let puertas = await pool.request().query("SELECT * FROM PUERTAS");
        return puertas.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getPuerta(codigoPuerta) {
    try {
        let pool = await sql.connect(config);
        let puerta = await pool.request()
            .input('input_paramater', sql.Int, codigoPuerta)
            .query("SELECT * from Puertas where Codigo = @input_paramater");
        return puerta.recordsets;
    } catch (error) {
        console.log(error);
    }

}


async function addPuerta(puerta) {
    try {
        let pool = await sql.connect(config);
        let insertPuerta = await pool.request()
            .input('Codigo', sql.Int, puerta.Codigo)
            .input('numeroPuerta', sql.VarChar, puerta.numeroPuerta)
            .input('CodigoAeroPuerto', sql.Int, puerta.CodigoAeroPuerto)
            .input('estado', sql.Bit, Puerta.estado)
            .query('INSERT INTO PUERTAS VALUES (@Codigo, @numeroPuerta, @CodigoAeroPuerto, @estado)')
        return insertPuerta.recordsets
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getPuertas: getPuertas,
    getPuerta: getPuerta,
    addPuerta: addPuerta
}