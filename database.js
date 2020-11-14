const mysql = require("mysql");

// Database Connection for Production

let config = {
    user: 'root',
    password: 'B99AePeE$$x9CgbKsB',
    database: 'coffeeshop',
    host: 'cs4750db-290216:us-east4:andromeda',
    socketPath: '/cloudsql/cs4750db-290216:us-east4:andromeda',
}
  
let connection = mysql.createConnection(config);

module.exports = connection;
