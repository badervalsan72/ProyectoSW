var config = require('../dbconfig');
const sql = require('mssql');


async function getConsecutivos() {
    try {
        let pool = await sql.connect(config);
        let consecutivo = await pool.request().query("SELECT * FROM consecutivos");
        return consecutivo.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getConsecutivo(codigoConsecutivo) {
    try {
        let pool = await sql.connect(config);
        let consecutivo = await pool.request()
            .input('input_paramater', sql.Int, codigoAeropuerto)
            .query("SELECT * from consecutivos where consecutivo = @input_paramater");
        return consecutivo.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addConsecutivo(consecutivo) {
    try {
        let pool = await sql.connect(config);
        let insertConsecutivo = await pool.request()
            .input('NumCuenta', sql.VarChar, consecutivo.Codigo)
            .input('CodigoSeguridad', sql.VarChar, consecutivo.CodigoSeguridad)
            .input('Contraseña', sql.Varchar, consecutivo.Contraseña)
            .input('estadoTransaccion', sql.Varchar, consecutivo.estadoTransaccion)
            .query('INSERT INTO Consecutivos VALUES (@NumCuenta, @CodigoSeguridad, @Contraseña, @estadoTransaccion)');
        return insertConsecutivo.recordsets
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getConsecutivos: getConsecutivos,
    getConsecutivo: getConsecutivo,
    addConsecutivo: addConsecutivo
}