var config = require('../dbconfig');
const sql = require('mssql');
const Aerolineas = require('../models/Aerolineas');

async function addAerolinea(codigo, nombreAgencia, imgAgencia, paisOrigen) {
    try {
        let pool = await sql.connect(config);
        let insertAerolinea = await pool.request()
            .input('Codigo', sql.VarChar, Aerolineas.codigo)
            .input('nombreAgencia', sql.VarChar, Aerolineas.nombreAgencia)
            .input('CodigoAeropuerto', sql.VarChar, Aerolineas.imgAgencia)
            .input('PaisOrigen', sql.VarChar, Aerolineas.paisOrigen)
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
            .input('nombre', sql.VarChar, nombre)
            .query("SELECT COUNT(*) as CANTPAISES from Paises where Codigo = @codigo OR Nombre = @nombre");
        return pais.recordset[0].CANTPAISES;
    } catch (error) {
        console.log(error);
    }

}


//falta un metodo que permita pedir todas las aerolineas




//falta un metodo para hacer update a una aerolinea en especifico



module.exports = {
    addAerolinea = addAerolinea,
    getAerolinea = getAerolinea
}