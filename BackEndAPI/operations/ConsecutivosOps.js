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

async function addConsecutivo1(consecutivo) {
    try {
        let pool = await sql.connect(config);
        let insertConsecutivo = await pool.request()
            .input('ConsecutivoID', sql.Int, consecutivo.ConsecutivoID)
            .input('Descripcion', sql.VarChar, consecutivo.Descripcion)
            .input('PoseePrefijo', sql.Varchar, consecutivo.PoseePrefijo)
            .input('Prefijo', sql.Varchar, consecutivo.Prefijo)
            .input('PoseeRango', sql.Varchar, consecutivo.PoseeRango)
            .input('RangoInicial', sql.Varchar, consecutivo.RangoInicial)
            .input('RangoFinal', sql.Varchar, consecutivo.RangoFinal)
            .query('INSERT INTO Consecutivos VALUES (@ConsecutivoID, @Descripcion, @PoseePrefijo, @Prefijo, @PoseeRango, @RangoInicial, @RangoFinal)');
        return insertConsecutivo.recordsets
    } catch (error) {
        console.log(error);
    }

}

async function addConsecutivo2(consecutivo) {
    try {
        let pool = await sql.connect(config);
        let insertConsecutivo = await pool.request()
            .input('ConsecutivoID', sql.Int, consecutivo.ConsecutivoID)
            .input('Descripcion', sql.VarChar, consecutivo.Descripcion)
            .input('PoseePrefijo', sql.Varchar, consecutivo.PoseePrefijo)
            .input('Prefijo', sql.Varchar, consecutivo.Prefijo)
            .input('PoseeRango', sql.Varchar, consecutivo.PoseeRango)
            .input('RangoInicial', sql.Varchar, consecutivo.RangoInicial)
            .input('RangoFinal', sql.Varchar, consecutivo.RangoFinal)
            .query('INSERT INTO Consecutivos VALUES (@ConsecutivoID, @Descripcion, @PoseePrefijo, @Prefijo, @PoseeRango, @RangoInicial, @RangoFinal)');
        return insertConsecutivo.recordsets
    } catch (error) {
        console.log(error);
    }

}

async function addConsecutivo3(consecutivo) {
    try {
        let pool = await sql.connect(config);
        let insertConsecutivo = await pool.request()
            .input('ConsecutivoID', sql.Int, consecutivo.ConsecutivoID)
            .input('Descripcion', sql.VarChar, consecutivo.Descripcion)
            .input('PoseePrefijo', sql.Varchar, consecutivo.PoseePrefijo)
            .input('Prefijo', sql.Varchar, consecutivo.Prefijo)
            .input('PoseeRango', sql.Varchar, consecutivo.PoseeRango)
            .input('RangoInicial', sql.Varchar, consecutivo.RangoInicial)
            .input('RangoFinal', sql.Varchar, consecutivo.RangoFinal)
            .query('INSERT INTO Consecutivos VALUES (@ConsecutivoID, @Descripcion, @PoseePrefijo, @Prefijo, @PoseeRango, @RangoInicial, @RangoFinal)');
        return insertConsecutivo.recordsets
    } catch (error) {
        console.log(error);
    }

}

async function addConsecutivo4(consecutivo) {
    try {
        let pool = await sql.connect(config);
        let insertConsecutivo = await pool.request()
            .input('ConsecutivoID', sql.Int, consecutivo.ConsecutivoID)
            .input('Descripcion', sql.VarChar, consecutivo.Descripcion)
            .input('PoseePrefijo', sql.Varchar, consecutivo.PoseePrefijo)
            .input('Prefijo', sql.Varchar, consecutivo.Prefijo)
            .input('PoseeRango', sql.Varchar, consecutivo.PoseeRango)
            .input('RangoInicial', sql.Varchar, consecutivo.RangoInicial)
            .input('RangoFinal', sql.Varchar, consecutivo.RangoFinal)
            .query('INSERT INTO Consecutivos VALUES (@ConsecutivoID, @Descripcion, @PoseePrefijo, @Prefijo, @PoseeRango, @RangoInicial, @RangoFinal)');
        return insertConsecutivo.recordsets
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getConsecutivos: getConsecutivos,
    getConsecutivo: getConsecutivo,
    addConsecutivo1: addConsecutivo1,
    addConsecutivo2: addConsecutivo2,
    addConsecutivo3: addConsecutivo3,
    addConsecutivo4: addConsecutivo4,
}