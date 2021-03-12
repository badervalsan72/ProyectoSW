const config = {
    user: 'admin', 
    password: '123', 
    server: '127.0.0.1', 
    database: 'ServiciosWebDB', 
    options: {
        trustedConnection: true, 
        enableArithPort: true, 
        instancename: 'SQLEXPRESS'
    }, 
    port: 49671
}

module.exports = config; 