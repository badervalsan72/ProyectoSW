var config = require('../dbconfig');
const sql = require('mssql');


async function getBitacoras() {
    try {
        let pool = await sql.connect(config);
        let bitacora = await pool.request().query("SELECT * FROM Bitacora");
        return bitacora.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getBitacora(codigobitacora) {
    try {
        let pool = await sql.connect(config);
        let bitacora = await pool.request()
            .input('input_paramater', sql.Int, codigobitacora)
            .query("SELECT * from bitacora where Codigo = @input_paramater");
        return bitacora.recordsets;
    } catch (error) {
        console.log(error);
    }

}


async function addBitacora(bitacora) {
    try {
        let pool = await sql.connect(config);
        let insertbitacora = await pool.request()
            .input('Codigo', sql.Int, bitacora.Codigo)
            .input('Fecha', sql.Date, bitacora.Fecha)
            .input('NombreUsuario', sql.VarChar, bitacora.NombreUsuario)
            .input('Tipo', sql.VarChar, bitacora.Tipo)
            .input('CodigoRegistro', sql.Int, bitacora.CodigoRegistro)
            .input('Descripcion', sql.VarChar, bitacora.Descripcion)
            .input('RegistroDetalle', sql.VarChar, bitacora.RegistroDetalle)
            .query('INSERT INTO Paises VALUES (@Codigo, @Fecha, @NombreUsuario, @Tipo, @CodigoRegistro, @Descripcion, @RegistroDetalle)')
        return insertbitacora.recordsets
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getbitacoras: getbitacoras,
    getbitacora: getbitacora,
    addbitacora: addbitacora
}