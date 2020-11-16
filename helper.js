var express = require("express");
const mysql = require("mysql");
var router = express.Router();
const connection = require('./database');

/* GET home page. */
router.get('/', function (req, res, next) {
  var itemname = req.query.name;
  console.log(req.query);
  var ID = parseInt(req.query.userid);

  let nm = req.query.itemname;
  let itemID = req.query.itemID;
  let quant = req.query.quant;
  let email = req.query.email;
  let shopid = req.query.shopid;
  delete req.query.itemname;
  delete req.query.itemID;
  delete req.query.quant;
  delete req.query.email;
  delete req.query.shopid;

  optionsobj = req.query
  console.log(optionsobj)
  console.log('asdf')
  connection.query(
    "SELECT * FROM `MenuItem` WHERE itemID = ?", parseInt(itemID),
    function (error, results, fields) {
      if (error) throw error;
      let baseprice = parseFloat(results[0].baseprice);
      console.log('base')
      console.log(baseprice)
      let price = baseprice;
      for (key in optionsobj) {
        let splitstr = optionsobj[key].split(',')
        console.log(splitstr[1])
        price += parseFloat(splitstr[1])
      }
      console.log(price)
      console.log('asdasdsadsad')
      connection.query(
        "SELECT * FROM `User` WHERE email = ?", email,
        function (error, resultsb, fields) {
          if (error) throw error;
          let cartobj = {
            name: nm,
            userID: resultsb[0].userID,
            itemID: itemID,
            options: optionsobj,
            quantity: quant,
            price: price
          };
          console.log(cartobj)

          connection.query(
            "INSERT INTO `ShoppingCart` SET ?",
            cartobj,
            function (error, results, fields) {
              if (error) throw error;
              res.redirect("/order?shopid="+shopid)
            }
          );
        }

      );
    }

  );



  // connection.query(
  //   "INSERT INTO `Owner` SET ?",
  //   userobj,
  //   function (error, results, fields) {
  //     if (error) throw error;
  //     if (results.length != 0) {
  //       userinfo.type = "owner";
  //       userinfo.new = true;
  //       return done(null, userinfo);
  //     }
  //   }
  // );

  // connection.query(
  //   "INSERT INTO ShoppingCart (userID, Quantity, name, price) VALUES (" + ID + ", " + quant + ", " + itemname + ", " + price_total + ")",
  //   function (error, results, fields) {
  //     if (error) throw error;
  //   }

  // );

});




module.exports = router;
