const mysql = require('mysql');

let dbExecute = (sql) => 
{
  return new Promise(function(resolve, reject) 
  {
    var con = mysql.createConnection(
      {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
      });

    con.query(sql, function (error, results) 
    {
      if (error)
        reject(error);
      else
        resolve(results);
        con.end();
        console.log('executou!');
    });

  });
  
}

exports.executa = dbExecute;









