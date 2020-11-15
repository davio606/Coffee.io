var express = require("express");
const mysql = require("mysql");
var router = express.Router();
const connection = require('./database');

/* GET home page. */
router.get('/', function(req, res, next) {
  var itemname = req.query.name;
  var ID = parseInt(req.query.userid);
  var quant = req.query.Quantity;
  var price_total = req.query.price;
  connection.query(
	"INSERT INTO ShoppingCart (userID, Quantity, name, price) VALUES (" + ID + ", " + quant + ", " + itemname + ", " + price_total + ")", 
	function(error, results, fields) {
	if (error) throw error;
	}
);

});




module.exports = router;
