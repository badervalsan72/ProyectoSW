var config = require('../dbconfig');
const sql = require('mssql');


async function getErrores() {
    try {
        let pool = await sql.connect(config);
        let errores = await pool.request().query("SELECT * FROM ERRORES");
        return errores.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getError(codigoError) {
    try {
        let pool = await sql.connect(config);
        let errores = await pool.request()
            .input('input_paramater', sql.Int, codigoError)
            .query("SELECT * from Errores where NumError = @input_paramater");
        return errores.recordsets;
    } catch (error) {
        console.log(error);
    }

}


async function addError(errorx) {
    try {
        let pool = await sql.connect(config);
        let insertError = await pool.request()
            .input('NumError', sql.Int, errorx.NumError)
            .input('Fecha', sql.Date, errorx.Fecha)
            .input('hora', sql.Time, errorx.hora)
            .input('Mensaje', sql.VarChar, errorx.Mensaje)
            .query('INSERT INTO Errores VALUES (@NumError, @Fecha, @hora, @Mensaje)')
        return insertError.recordsets
    } catch (err) {

        console.log('Error');
        console.log(err);
    }

}

module.exports = {
    getErrores: getErrores,
    getError: getError,
    addError: addError
}