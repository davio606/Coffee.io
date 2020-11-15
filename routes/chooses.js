var express = require('express');
var router = express.Router();
const connection = require('../database');
var helper = require('../helper');

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.query.name;
  var id = parseInt(req.query.itemid);
  connection.query(
    "SELECT * FROM `MenuItemOptions` WHERE itemID= ?", id,
    function(error, results, fields) {
      if (error) throw error;
 	  res.render('chooses', { title: 'Express', name:name, user: req.user, options: results,helper:helper});
    }
  );

});

module.exports = router;
