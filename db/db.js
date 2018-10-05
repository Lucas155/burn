const mysql = require('mysql');

module.exports = {
    // Identação zuada
    executa: (sql, res) => 
    {
        var con = mysql.createConnection(
        {
            host: process.env.DB_host,
            user: process.env.DB_user,
            password: process.env.DB_pass,
            database: process.env.DB_database
        });
        //Colocar logica de retorno no burn.js e não na camada de banco
        
        con.query(sql, function (error, results, fields) {
            if (error)
                res.json(error);
            else
                res.json(results);
            con.end();
            console.log('executou!');
        });
    }
}









