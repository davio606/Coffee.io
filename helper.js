const mysql = require("mysql");
var router = express.Router();
const connection = require('database');

function addOrder(ID, quant, itemname, price_total) {
     connection.query(
    "INSERT INTO ShoppingCart (userID, Quantity, name, price) VALUES (" + ID + ", " + quant + ", " + itemname + ", " + price_total + ")", 
    function(error, results, fields) {
      if (error) throw error;
    }
  );
}

module.exports = router;
