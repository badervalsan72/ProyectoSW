var config = require('../dbconfig');
const sql = require('mssql');

async function getPaisNC(codigo, nombre) {
    try {
        console.log("codigo " + codigo + "nombre " + nombre);
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
async function getPaises() {
    try {
        let pool = await sql.connect(config);
        let paises = await pool.request().query("SELECT * FROM PAISES");
        return paises.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getPais(codigoPais) {
    try {
        let pool = await sql.connect(config);
        let pais = await pool.request()
            .input('input_paramater', sql.Int, codigoPais)
            .query("SELECT * from Paises where Codigo = @input_paramater");
        return pais.recordsets;
    } catch (error) {
        console.log(error);
    }

}


async function addPais(Codigo, Nombre, ImgPais) {
    try {
        let pool = await sql.connect(config);
        let insertPais = await pool.request()
            .input('Codigo', sql.VarChar, Codigo)
            .input('Nombre', sql.VarChar, Nombre)
            .input('ImgPais', sql.VarChar, ImgPais)
            .query('INSERT INTO Paises VALUES (@Codigo, @Nombre, @ImgPais)')
        return insertPais.recordsets
    } catch (err) {

        console.log('Error');
        console.log(err);
    }

}

module.exports = {
    getPaisNC: getPaisNC,
    getPaises: getPaises,
    getPais: getPais,
    addPais: addPais
}