var express = require('express');
var router = express.Router();
const connection = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  }
  else if (req.user.type == "user") {
    connection.query(
      "SELECT * FROM `User` WHERE email = ? ", req.user.email,
      function(error, results, fields) {
        if (error) throw error;
        res.render('user', { title: 'Express', userdata: results[0]});
      }
    );
  }
  else if (req.user.type == "owner") {
    res.render('owner', { title: 'Express' });
  }
  else {
    res.redirect('/login');
  }
});

module.exports = router;
