var config = require('../dbconfig');
const sql = require('mssql');


async function getVuelos() {
    try {
        let pool = await sql.connect(config);
        let vuelos = await pool.request().query("SELECT * FROM Vuelos");
        return vuelos.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getVuelo(codigoVuelo) {
    try {
        let pool = await sql.connect(config);
        let vuelo = await pool.request()
            .input('input_paramater', sql.VarChar, codigoVuelo)
            .query("SELECT * from Vuelos where Codigo = @input_paramater");
        return vuelo.recordsets;
    } catch (error) {
        console.log(error);
    }

}


async function addVuelo(vuelo) {
    try {
        let pool = await sql.connect(config);
        let insertVuelo = await pool.request()
            .input('Codigo', sql.VarChar, vuelos.Codigo)
            .input('CodigoAeroLinea', sql.Int, vuelos.CodigoAeroLinea)
            .input('CodigoOrigen', sql.Int, vuelos.CodigoOrigen)
            .input('CodigoDestino', sql.Int, vuelos.CodigoDestino)
            .input('fecha', sql.Date, vuelos.fecha)
            .input('hora', sql.Time, vuelos.hora)
            .input('estado', sql.Int, vuelos.estado)
            .input('CodigoPuerta', sql.Int, vuelos.CodigoPuertas)
            .query('INSERT INTO Vuelos VALUES (@Codigo, @CodigoAeroLinea, @CodigoOrigen, @CodigoDestino, @fecha, @hora, @estado, @CodigoPuerta)');
        return insertVuelo.recordsets
    } catch (err) {

        console.log('Error');
        console.log(err);
    }

}

module.exports = {
    getVuelos: getVuelos,
    getVuelo: getVuelo,
    addVuelo: addVuelo
}