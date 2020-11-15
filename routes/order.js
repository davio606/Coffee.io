var express = require('express');
var router = express.Router();
const connection = require('../database');

router.get('/', function(req, res, next) {
  var name = req.query.name;
  var id = parseInt(req.query.shopid);
  connection.query(
    "SELECT * FROM 'MenuItem' WHERE shopID = ?", id,
    function(error, results, fields) {
      if (error) throw error;
      res.render('find', { title: 'Express', name:name, items: results});
    }
  );
});
console.log("here again");
module.exports = router;
