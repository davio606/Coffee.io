var express = require('express');
var router = express.Router();
const connection = require('../database');
const { Parser } = require('json2csv');
fs = require('fs');


/* GET home page. */
router.post('/', function (req, res, next) {
    let shopID = req.query.shopID;
    connection.query(
        "SELECT * FROM `ListOrders` WHERE shopID = ?", shopID,
        function (error, results, fields) {
            if (error) throw error;


            const colnames = ['orderID', 'userID', 'shopID', 'price_subtotal', 'price_taxes', 'tip', 'status', 'datetimeplaced', 'datetimefulfilled', 'special_instructions'];
            const opts = { colnames };


            const parser = new Parser(opts);
            const csv = parser.parse(results);
            let path = '/tmp/file' + Date.now() + '.csv';
            fs.writeFile(path, csv, function (err, data) {
                console.log(path);
                if (err) { throw err; }
                else {
                    console.log('yoooooooooo')
                    res.download(path); // This is what you need
                }
            });
        }
    );
});

module.exports = router;