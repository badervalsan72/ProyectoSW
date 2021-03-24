var config = require('../dbconfig');
const sql = require('mssql');


async function getEasyPays() {
    try {
        let pool = await sql.connect(config);
        let easypay = await pool.request().query("SELECT * FROM EASYPAY");
        return easypay.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getEasyPay(codigoEasyPay) {
    try {
        let pool = await sql.connect(config);
        let easypay = await pool.request()
            .input('input_paramater', sql.Int, codigoEasyPay)
            .query("SELECT * from easypay where Codigo = @input_paramater");
        return easypay.recordsets;
    } catch (error) {
        console.log(error);
    }

}


async function addEasyPay(easypay) {
    try {
        let pool = await sql.connect(config);
        let insertEasyPay = await pool.request()
            .input('NumCuenta', sql.Varchar, easypay.NumCuenta)
            .input('CodigoSeguridad', sql.VarChar, easypay.CodigoSeguridad)
            .input('Contraseña', sql.Varchar, easypay.Contraseña)
            .input('estadoTransaccion', sql.Varchar, easypay.estadoTransaccion)
            .query('INSERT INTO EasyPay VALUES (@NumCuenta, @CodigoSeguridad, @Contraseña, @estadoTransaccion)');
        return insertEasyPay.recordsets
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getEasyPays: getEasyPays,
    getEasyPay: getEasyPay,
    addEasyPay: addEasyPay
}