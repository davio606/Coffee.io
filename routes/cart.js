var express = require('express');
var router = express.Router();
const connection = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.user) {
        if (req.user.type == "user") {
            connection.query(
                "SELECT * FROM `User` WHERE email = ? ", req.user.email,
                function (error, results, fields) {
                    if (error) throw error;
                    connection.query(
                        "SELECT * FROM `ShoppingCart` WHERE userID = ? ", results[0].userID,
                        function (error, resultsb, fields) {
                            if (error) throw error;

                            let total = 0;
                            function myFunc(total, num) {
                                return parseFloat(total) + parseFloat(num);
                            }
                            if (resultsb.length != 0) {
                                total = resultsb.reduce(myFunc);
                            }

                            res.render('cart', { title: 'Express', user: req.user, cartdata: resultsb, total: total });
                        }
                    );
                }
            );
        }
        else {
            res.redirect('/index');
        }
    }
    else {
        res.redirect('/index');
    }
});

module.exports = router;
