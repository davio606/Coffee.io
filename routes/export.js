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

            try {
                const parser = new Parser(opts);
                const csv = parser.parse(results);
                console.log(csv);
            } catch (err) {
                console.error(err);
            }
            res.redirect('/orderhistory');
        }
    );
});

module.exports = router;


/*
 RowDataPacket {
2020-11-15 23:15:55 default[20201115t181430]      orderID: 9,
2020-11-15 23:15:55 default[20201115t181430]      userID: 3,
2020-11-15 23:15:55 default[20201115t181430]      shopID: 1,
2020-11-15 23:15:55 default[20201115t181430]      price_subtotal: 3,
2020-11-15 23:15:55 default[20201115t181430]      price_taxes: 0.3,
2020-11-15 23:15:55 default[20201115t181430]      tip: 1.5,
2020-11-15 23:15:55 default[20201115t181430]      status: 'Order Fulfilled',
2020-11-15 23:15:55 default[20201115t181430]      datetimeplaced: 2020-10-30T09:49:12.000Z,
2020-11-15 23:15:55 default[20201115t181430]      datetimefulfilled: 2020-10-30T09:54:12.000Z,
2020-11-15 23:15:55 default[20201115t181430]      special_instructions: 'N/A\r' },
2020-11-15 23:15:55 default[20201115t181430]    RowDataPacket {
2020-11-15 23:15:55 default[20201115t181430]      orderID: 10,
2020-11-15 23:15:55 default[20201115t181430]      userID: 4,
2020-11-15 23:15:55 default[20201115t181430]      shopID: 1,
2020-11-15 23:15:55 default[20201115t181430]      price_subtotal: 3,
2020-11-15 23:15:55 default[20201115t181430]      price_taxes: 0.3,
2020-11-15 23:15:55 default[20201115t181430]      tip: 2,
2020-11-15 23:15:55 default[20201115t181430]      status: 'Order Fulfilled',
2020-11-15 23:15:55 default[20201115t181430]      datetimeplaced: 2020-10-31T09:52:12.000Z,
2020-11-15 23:15:55 default[20201115t181430]      datetimefulfilled: 2020-10-31T09:55:12.000Z,
2020-11-15 23:15:55 default[20201115t181430]      special_instructions: 'N/A' } ]
2020-11-15 23:15:58 default[20201115t181430]  "GET /style.css HTTP/1.1" 304
2020-11-15 23:15:58 default[20201115t181430]  ←[0mGET /style.css ←[36m304 ←[0m0.497 ms - -←[0m
2020-11-15 23:16:00 default[20201115t181430]  [ RowDataPacket {
2020-11-15 23:16:00 default[20201115t181430]      orderID: 5,
2020-11-15 23:16:00 default[20201115t181430]      userID: 3,
2020-11-15 23:16:00 default[20201115t181430]      shopID: 1,
2020-11-15 23:16:00 default[20201115t181430]      price_subtotal: 3,
2020-11-15 23:16:00 default[20201115t181430]      price_taxes: 0.3,
2020-11-15 23:16:00 default[20201115t181430]      tip: 1,
2020-11-15 23:16:00 default[20201115t181430]      status: 'Order Fulfilled',
2020-11-15 23:16:00 default[20201115t181430]      datetimeplaced: 2020-10-26T09:37:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      datetimefulfilled: 2020-10-26T09:50:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      special_instructions: 'N/A\r' },
2020-11-15 23:16:00 default[20201115t181430]    RowDataPacket {
2020-11-15 23:16:00 default[20201115t181430]      orderID: 6,
2020-11-15 23:16:00 default[20201115t181430]      userID: 4,
2020-11-15 23:16:00 default[20201115t181430]      shopID: 1,
2020-11-15 23:16:00 default[20201115t181430]      price_subtotal: 3,
2020-11-15 23:16:00 default[20201115t181430]      price_taxes: 0.3,
2020-11-15 23:16:00 default[20201115t181430]      tip: 0.5,
2020-11-15 23:16:00 default[20201115t181430]      status: 'Order Fulfilled',
2020-11-15 23:16:00 default[20201115t181430]      datetimeplaced: 2020-10-27T09:40:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      datetimefulfilled: 2020-10-27T09:51:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      special_instructions: 'N/A\r' },
2020-11-15 23:16:00 default[20201115t181430]    RowDataPacket {
2020-11-15 23:16:00 default[20201115t181430]      orderID: 7,
2020-11-15 23:16:00 default[20201115t181430]      userID: 2,
2020-11-15 23:16:00 default[20201115t181430]      shopID: 1,
2020-11-15 23:16:00 default[20201115t181430]      price_subtotal: 3,
2020-11-15 23:16:00 default[20201115t181430]      price_taxes: 0.3,
2020-11-15 23:16:00 default[20201115t181430]      tip: 0.75,
2020-11-15 23:16:00 default[20201115t181430]      status: 'Order Fulfilled',
2020-11-15 23:16:00 default[20201115t181430]      datetimeplaced: 2020-10-28T09:43:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      datetimefulfilled: 2020-10-28T09:52:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      special_instructions: 'N/A\r' },
2020-11-15 23:16:00 default[20201115t181430]    RowDataPacket {
2020-11-15 23:16:00 default[20201115t181430]      orderID: 8,
2020-11-15 23:16:00 default[20201115t181430]      userID: 1,
2020-11-15 23:16:00 default[20201115t181430]      shopID: 1,
2020-11-15 23:16:00 default[20201115t181430]      price_subtotal: 3,
2020-11-15 23:16:00 default[20201115t181430]      price_taxes: 0.3,
2020-11-15 23:16:00 default[20201115t181430]      tip: 1,
2020-11-15 23:16:00 default[20201115t181430]      status: 'Order Fulfilled',
2020-11-15 23:16:00 default[20201115t181430]      datetimeplaced: 2020-10-29T09:46:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      datetimefulfilled: 2020-10-29T09:53:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      special_instructions: 'N/A\r' },
2020-11-15 23:16:00 default[20201115t181430]    RowDataPacket {
2020-11-15 23:16:00 default[20201115t181430]      orderID: 9,
2020-11-15 23:16:00 default[20201115t181430]      userID: 3,
2020-11-15 23:16:00 default[20201115t181430]      shopID: 1,
2020-11-15 23:16:00 default[20201115t181430]      price_subtotal: 3,
2020-11-15 23:16:00 default[20201115t181430]      price_taxes: 0.3,
2020-11-15 23:16:00 default[20201115t181430]      tip: 1.5,
2020-11-15 23:16:00 default[20201115t181430]      status: 'Order Fulfilled',
2020-11-15 23:16:00 default[20201115t181430]      datetimeplaced: 2020-10-30T09:49:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      datetimefulfilled: 2020-10-30T09:54:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      special_instructions: 'N/A\r' },
2020-11-15 23:16:00 default[20201115t181430]    RowDataPacket {
2020-11-15 23:16:00 default[20201115t181430]      orderID: 10,
2020-11-15 23:16:00 default[20201115t181430]      userID: 4,
2020-11-15 23:16:00 default[20201115t181430]      shopID: 1,
2020-11-15 23:16:00 default[20201115t181430]      price_subtotal: 3,
2020-11-15 23:16:00 default[20201115t181430]      price_taxes: 0.3,
2020-11-15 23:16:00 default[20201115t181430]      tip: 2,
2020-11-15 23:16:00 default[20201115t181430]      status: 'Order Fulfilled',
2020-11-15 23:16:00 default[20201115t181430]      datetimeplaced: 2020-10-31T09:52:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      datetimefulfilled: 2020-10-31T09:55:12.000Z,
2020-11-15 23:16:00 default[20201115t181430]      special_instructions: 'N/A' } ]
*/