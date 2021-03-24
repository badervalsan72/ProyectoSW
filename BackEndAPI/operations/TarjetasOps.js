var config = require('../dbconfig');
const sql = require('mssql');


async function getTarjetas() {
    try {
        let pool = await sql.connect(config);
        let tarjetas = await pool.request().query("SELECT * FROM Tarjetas");
        return tarjetas.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getTarjeta(codigoTarjeta) {
    try {
        let pool = await sql.connect(config);
        let tarjeta = await pool.request()
            .input('input_paramater', sql.VarChar, codigoTarjeta)
            .query("SELECT * from Tarjetas where NumTarjeta = @input_paramater");
        return tarjeta.recordsets;
    } catch (error) {
        console.log(error);
    }

}


async function addTarjeta(tarjeta) {
    try {
        let pool = await sql.connect(config);
        let insertTarjeta = await pool.request()
            .input('NumTarjeta', sql.VarChar, tarjeta.NumTarjeta)
            .input('mesExp', sql.Int, tarjeta.mesExp)
            .input('añoExp', sql.Int, pais.añoExp)
            .input('ccv', sql.Int, pais.ccv)
            .input('monto', sql.VarChar, pais.monto)
            .input('tipo', sql.VarChar, pais.tipo)
            .query('INSERT INTO Tarjetas VALUES (@NumTarjeta, @mesExp, @añoExp, @ccv, @monto, @tipo)');
        return insertTarjeta.recordsets
    } catch (err) {

        console.log('Error');
        console.log(err);
    }

}

module.exports = {
    getTarjetas: getTarjetas,
    getTarjeta: getTarjeta,
    addTarjeta: addTarjeta
}