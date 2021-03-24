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

async function getPais(codigoPais) {
    try { 
        let pool = await sql.connect(config); 
        let pais = await pool.request()
            .input('input_paramater', sql.Int, codigoPais)
            .query("SELECT * from Paises where Codigo = @input_paramater"); 
        return pais.recordsets;         
    }
    catch (error) { 
        console.log(error); 
    }
    
}


async function addPais(pais) { 
    try {
        let pool = await sql.connect(config);
        let insertPais = await pool.request()
            .input('Codigo', sql.Int, pais.Codigo)
            .input('Nombre', sql.VarChar, pais.Nombre)
            .input('ImgPais', sql.VarChar, pais.ImgPais)            
            .query('INSERT INTO Paises VALUES (@Codigo, @Nombre, @ImgPais)')        
        return insertPais.recordsets
    }
    catch (err) {
         
        console.log('Error'); 
        console.log(err);
    }

}

module.exports = { 
    getPaises : getPaises,  
    getPais : getPais, 
    addPais : addPais
}