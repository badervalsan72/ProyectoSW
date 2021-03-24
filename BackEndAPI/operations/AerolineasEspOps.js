var config = require('../dbconfig');
const sql = require('mssql');


async function getAerolineasEsp() {
    try {
        let pool = await sql.connect(config);
        let aerolineasEsp = await pool.request().query("SELECT * FROM AEROLINEASESP");
        return aerolineasEsp.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getAerolineaEsp(codigoAerolineasEsp) {
    try {
        let pool = await sql.connect(config);
        let AerolineasEsp = await pool.request()
            .input('input_paramater', sql.Int, codigoAerolineasEsp)
            .query("SELECT * from AerolineasEsp where CodigoEsp = @input_paramater");
        return AerolineasEsp.recordsets;
    } catch (error) {
        console.log(error);
    }
}


async function addAerolineasEsp(AerolineasEsp) {
    try {
        let pool = await sql.connect(config);
        let insertAerolineasEsp = await pool.request()
            .input('CodigoEsp', sql.Int, AerolineasEsp.CodigoEsp)
            .input('CodigoAerolinea', sql.Int, AerolineasEsp.CodigoAerolinea)
            .input('CodigoAeropuerto', sql.Int, AerolineasEsp.codigoAeropuerto)
            .query('INSERT INTO AerolineasEsp VALUES (@CodigoEsp, @CodigoAerolinea, @CodigoAeroPuerto)')
        return insertAerolineasEsp.recordsets
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getAerolineasEsp: getAerolineasEsp,
    getAerolineaEsp: getAerolineaEsp,
    addAerolineasEsp: addAerolineasEsp
}