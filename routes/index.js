var express = require('express');
var router = express.Router();
const connection = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.user) {
    console.log(req.user.type)
    if (req.user.type=="user") {
      connection.query(
        "SELECT * FROM `User` WHERE email = ?", req.user.email,
        function (error, results, fields) {
          if (error) throw error;
          res.render('index', { title: 'Express', user: req.user, userdata: results[0] });
        }
      );
    }
    else {
      connection.query(
        "SELECT * FROM `Owner` WHERE email = ?", req.user.email,
        function (error, results, fields) {
          console.log('help');
          console.log(results);
          if (error) throw error;
          res.render('dashboard', { title: 'Express', user: req.user, userdata: results[0] });
        }
      );
    }
    
  }
  else {
    res.render('index', { title: 'Express', user: req.user });
  }
});

module.exports = router;
