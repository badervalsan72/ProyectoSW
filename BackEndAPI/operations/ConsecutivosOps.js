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
            .input('codigoConsecutivo', sql.VarChar, codigoConsecutivo)
            .query("SELECT * from consecutivos where consecutivoID = @codigoConsecutivo");
        console.log(consecutivo.recordsets[0]);
        console.log("HOLAAAAAAAAAAAA");
        return consecutivo.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getConsecutivoDescripcion(descripcion) {
    try {

        let pool = await sql.connect(config);
        let consecutivo = await pool.request()
            .input('descripcion', sql.VarChar, descripcion)
            .query("SELECT * from consecutivos where Descripcion = @descripcion");
        console.log(consecutivo.recordsets[0]);
        return consecutivo.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addConsecutivo(ConsecutivoID, Consecutivo, Descripcion, PoseePrefijo, Prefijo, PoseeRango, RangoInicial, RangoFinal) {
    try {
        console.log(ConsecutivoID + " " + Descripcion + " " + PoseePrefijo + " " + Prefijo + " " + PoseeRango + " " + RangoInicial + " " + RangoFinal);

        let pool = await sql.connect(config);
        let insertConsecutivo = await pool.request()
            .input('ConsecutivoID', sql.VarChar, ConsecutivoID)
            .input('Consecutivo', sql.VarChar, Consecutivo)
            .input('Descripcion', sql.VarChar, Descripcion)
            .input('PoseePrefijo', sql.Bit, PoseePrefijo)
            .input('Prefijo', sql.VarChar, Prefijo)
            .input('PoseeRango', sql.Bit, PoseeRango)
            .input('RangoInicial', sql.Int, RangoInicial)
            .input('RangoFinal', sql.Int, RangoFinal)
            .query('INSERT INTO Consecutivos VALUES (@ConsecutivoID, @Consecutivo, @Descripcion, @PoseePrefijo, @Prefijo, @PoseeRango, @RangoInicial, @RangoFinal)');
        return insertConsecutivo.recordsets
    } catch (error) {
        console.log(error);
    }

}

async function updateConsecutivo(oldConsecutivoID, ConsecutivoID, Consecutivo, Descripcion, PoseePrefijo, Prefijo, PoseeRango, RangoInicial, RangoFinal) {
    try {
        console.log(ConsecutivoID + " " + Descripcion + " " + PoseePrefijo + " " + Prefijo + " " + PoseeRango + " " + RangoInicial + " " + RangoFinal);

        let pool = await sql.connect(config);
        let insertConsecutivo = await pool.request()
            .input('oldConsecutivoID', sql.VarChar, oldConsecutivoID)
            .input('ConsecutivoID', sql.VarChar, ConsecutivoID)
            .input('Consecutivo', sql.VarChar, Consecutivo)
            .input('Descripcion', sql.VarChar, Descripcion)
            .input('PoseePrefijo', sql.Bit, PoseePrefijo)
            .input('Prefijo', sql.VarChar, Prefijo)
            .input('PoseeRango', sql.Bit, PoseeRango)
            .input('RangoInicial', sql.Int, RangoInicial)
            .input('RangoFinal', sql.Int, RangoFinal)
            .query(
                'UPDATE Consecutivos ' +
                'SET ConsecutivoID = @ConsecutivoID, Consecutivo = @Consecutivo, Descripcion = @Descripcion, ' +
                'PoseePrefijo = @PoseePrefijo, Prefijo = @Prefijo, ' +
                'PoseeRango = @PoseeRango, RangoInicial = @RangoInicial, RangoFinal = @RangoFinal ' +
                'WHERE ConsecutivoID = @oldConsecutivoID; '
            );
        return insertConsecutivo.recordsets
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    getConsecutivos: getConsecutivos,
    getConsecutivoDescripcion: getConsecutivoDescripcion,
    getConsecutivo: getConsecutivo,
    addConsecutivo: addConsecutivo,
    updateConsecutivo: updateConsecutivo
}