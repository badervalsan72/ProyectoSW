var config = require('./dbconfig'); 
const sql = require('mssql'); 


async function getPaises() { 
    try { 
        let pool = await sql.connect(config); 
        let paises = await pool.request().query("SELECT * FROM PAISES"); 
        return paises.recordsets; 
    }
    catch (error) { 
        console.log(error); 
    }
}

module.exports = { 
    getPiases : getPaises 
}