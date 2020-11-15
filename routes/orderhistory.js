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
                        "SELECT * FROM `ListOrders` WHERE userID = ? ", results[0].userID,
                        function (error, resultsb, fields) {
                            if (error) throw error;
                            res.render('orderhistory', { title: 'Express', orderdata: resultsb });
                        }
                    );
                }
            );
        }
        else {
            connection.query(
                "SELECT * FROM `Owner` WHERE email = ? ", req.user.email,
                function (error, results, fields) {
                    if (error) throw error;
                    connection.query(
                        "SELECT * FROM `ListOrders` WHERE shopID = ? ", results[0].shopID,
                        function (error, resultsb, fields) {
                            if (error) throw error;
                            res.render('orderhistory', { title: 'Express', orderdata: resultsb, user: req.user, shopID: results[0].shopID });
                        }
                    );
                }
            );
        }
    }
    else {
        res.redirect('/index');
    }
});

module.exports = router;
