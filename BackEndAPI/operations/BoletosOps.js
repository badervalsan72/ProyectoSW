var config = require('../dbconfig');
const sql = require('mssql');


async function getBoletos() {
    try {
        let pool = await sql.connect(config);
        let boleto = await pool.request().query("SELECT * FROM Boletos");
        return boleto.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getBoleto(codigoBoleto) {
    try {
        let pool = await sql.connect(config);
        let boleto = await pool.request()
            .input('input_paramater', sql.VarChar, codigoBoleto)
            .query("SELECT * from Boletos where Codigo = @input_paramater");
        return boleto.recordsets;
    } catch (error) {
        console.log(error);
    }
}


async function addBoleto(Boleto) {
    try {
        let pool = await sql.connect(config);
        let insertBoleto = await pool.request()
            .input('Codigo', sql.VarChar, AerolineasEsp.Codigo)
            .input('CodigoVuelo', sql.VarChar, AerolineasEsp.CodigoVuelo)
            .input('NombreUsuario', sql.VarChar, AerolineasEsp.NombreUsuario)
            .input('Asiento', sql.VarChar, AerolineasEsp.Asiento)
            .input('estadoBoleto', sql.Bit, AerolineasEsp.estadoBoleto)
            .query('INSERT INTO Boletos VALUES (@Codigo, @CodigoVuelo, @NombreUsuario, @Asiento, @estadoBoleto)');
        return insertBoleto.recordsets
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getBoletos: getBoletos,
    getBoleto: getBoleto,
    addBoleto: addBoleto
}