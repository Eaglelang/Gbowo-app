let mysql = require('mysql');
let conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'root',     
  database: 'gbowo',
  multipleStatements: true
}); 

//connect to th Mysql server
conn.connect (function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
  
});
module.exports = conn;