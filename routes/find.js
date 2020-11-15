var express = require('express');
var router = express.Router();
const connection = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query(
    "SELECT * FROM `Coffeeshop` ",
    function(error, results, fields) {
      if (error) throw error;
      res.render('find', { title: 'Express', shops: results});
    }
  );
});

module.exports = router;
