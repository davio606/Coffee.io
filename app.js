var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const connection = require("./database");


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var accountRouter = require("./routes/account");
var aboutRouter = require("./routes/about");
var bakeryRouter = require("./routes/bakery");
var choosesRouter = require("./routes/chooses");
var editMenuRouter = require("./routes/editmenu");
var findRouter = require("./routes/find");
var signupRouter = require("./routes/signup");
var loginRouter = require("./routes/login");
var aboutRouter = require("./routes/about");
var orderRouter = require("./routes/order");
var receiveRouter = require("./routes/receive");
var helpRouter = require("./helper");
const ownerloginRouter = require('./routes/ownerlogin');
const orderhistoryRouter = require('./routes/orderhistory');
const exportRouter = require('./routes/export');
const cartRouter = require('./routes/cart');
const { info } = require("console");
var app = express();

app.use(require("serve-static")(__dirname + "/../../public"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/index", indexRouter);
app.use("/users", usersRouter);
app.use("/account", accountRouter);
app.use("/signup", signupRouter);
app.use("/addOrder", helpRouter);

function done(err, user) {
  res.redirect("/find");
}

ownerloginstrat = new GoogleStrategy(
  {
    clientID:
      "450927576549-gstvnstsb2taa9qfqda3f14fusjrfqsj.apps.googleusercontent.com",
    clientSecret: "UPgRFeHYJC7i4Ed1tAGWCz4Y",
    callbackURL: "/loginowner/callback",
  },
  async function (accessToken, refreshToken, profile, done) {
    console.log('this is the ownerloginstrat')
    userinfo = profile._json;
    connection.query(
      "SELECT * FROM `User` WHERE `email` =" +
      connection.escape(userinfo.email),
      function (error, results, fields) {
        if (error) throw error;
        if (results.length != 0) {
          userinfo.type = "user";
          return done(null, userinfo);
        } else {
          connection.query(
            "SELECT * FROM `Owner` WHERE `email` =" +
            connection.escape(userinfo.email),
            function (error, results, fields) {
              if (error) throw error;
              if (results.length != 0) {
                userinfo.type = "owner";
                return done(null, userinfo);
              } else {
                userobj = {
                  password: 'asdfasd',
                  username: userinfo.email,
                  firstname: userinfo.given_name,
                  lastname: userinfo.family_name,
                  email: userinfo.email,
                  phone: "0000000000",
                  shopID: 1,
                };
                connection.query(
                  "INSERT INTO `Owner` SET ?",
                  userobj,
                  function (error, results, fields) {
                    if (error) throw error;
                    if (results.length != 0) {
                      userinfo.type = "owner";
                      userinfo.new = true;
                      return done(null, userinfo);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
)

userloginstrat = new GoogleStrategy(
  {
    clientID:
      "450927576549-gstvnstsb2taa9qfqda3f14fusjrfqsj.apps.googleusercontent.com",
    clientSecret: "UPgRFeHYJC7i4Ed1tAGWCz4Y",
    callbackURL: "/login/callback",
  },
  async function (accessToken, refreshToken, profile, done) {
    console.log('this is the userloginstrat')
    userinfo = profile._json;
    connection.query(
      "SELECT * FROM `User` WHERE `email` =" +
      connection.escape(userinfo.email),
      function (error, results, fields) {
        if (error) throw error;
        if (results.length != 0) {
          userinfo.type = "user";
          return done(null, userinfo);
        } else {
          connection.query(
            "SELECT * FROM `Owner` WHERE `email` =" +
            connection.escape(userinfo.email),
            function (error, results, fields) {
              if (error) throw error;
              if (results.length != 0) {
                userinfo.type = "owner";
                return done(null, userinfo);
              } else {
                userobj = {
                  username: userinfo.email,
                  firstname: userinfo.given_name,
                  lastname: userinfo.family_name,
                  email: userinfo.email,
                  phone: "0000000000",
                  address_zipcode: "00000",
                  address_street: "000 Park Street",
                };
                connection.query(
                  "INSERT INTO `User` SET ?",
                  userobj,
                  function (error, results, fields) {
                    if (error) throw error;
                    if (results.length != 0) {
                      userinfo.type = "user";
                      userinfo.new = true;
                      return done(null, userinfo);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
)

// Passport helper function to serialize the user for storage in the session
passport.serializeUser((user, done) => {
  if (user) {
    return done(null, JSON.stringify(user));
  }

  return done(new Error("Cannot serialize user."));
});

// Passport helper function to deserialize the user from the ID in the session
passport.deserializeUser((id, done) => {
  try {
    const user = JSON.parse(id);
    return done(null, user);
  } catch (e) {
    return done(new Error("Cannot deserialize user."));
  }
});

app.use(
  "/login/callback",
  passport.authenticate(userloginstrat, { failureRedirect: "/index" }),
  function (req, res) {
    if (req.user.new) {
      return res.redirect("/account");
    }
    res.redirect("/index");
  }
);

app.use(
  "/loginowner/callback",
  passport.authenticate(ownerloginstrat, { failureRedirect: "/index" }),
  function (req, res) {
    if (req.user.new) {
      return res.redirect("/account");
    }
    res.redirect("/index");
  }
);

app.use(
  "/login",
  passport.authenticate(userloginstrat, {
    scope: "profile email openid",
  })
);

app.use(
  "/loginowner",
  passport.authenticate(ownerloginstrat, {
    scope: "profile email openid",
  })
);

app.use(
  "/logout",
  function (req, res, next) {
    req.logout();
    res.redirect('/');
  }
);

app.use('/placeorder', function (req, res, next) {
  connection.query(
    "SELECT * From `User` WHERE email = ?", req.user.email,
    function (error, results, fields) {
      let userID = results[0].userID;
      connection.query(
        "SELECT * From ShoppingCart WHERE userID = ?", results[0].userID,
        function (error, resultsb, fields) {
          let total = 0
          function myFunc(total, num) {
            return parseFloat(total) + parseFloat(num);
          }
          if (resultsb.length != 0) {
            total = resultsb.reduce(myFunc);
          }
          console.log(total);
          let orderobj = {
            userID: results[0].userID,
            shopID: resultsb[0].shopID,
            price_subtotal: total,
            price_taxes: total * 0.05,
            tip: 0,
            status: 'Order Placed',
            datetimeplaced: Date.now(),
            special_instructions: "N/A"
          }
          connection.query(
            "INSERT INTO `ListOrders` SET ?",
            orderobj,
            function (error, resultsc, fields) {
              if (error) throw error;
              connection.query(
                "DELETE FROM ShoppingCart WHERE userID = ?",
                userID,
                function (error, results, fields) {
                  if (error) throw error;
                  res.redirect("/orderhistory")
                }
              );
            }
          );
        }
      );
    }
  );


  connection.query(
    "DELETE From ShoppingCart WHERE cartID = ?", req.query.cartID,
    function (error, results, fields) {
      console.log(error);
      console.log(results);
      res.redirect("/cart");
    }
  );
})

app.use("/deletecartitem", function (req, res, next) {
  connection.query(
    "DELETE From ShoppingCart WHERE cartID = ?", req.query.cartID,
    function (error, results, fields) {
      console.log(error);
      console.log(results);
      res.redirect("/cart");
    }
  );
});


app.use("/updateuser", function (req, res, next) {
  console.log(req.body);
  connection.query(
    "UPDATE User SET username = ?, firstname = ?, lastname = ?, phone = ?, address_street = ?, address_zipcode = ? WHERE userID = ?",
    [
      req.body.username,
      req.body.fname,
      req.body.lname,
      req.body.phone,
      req.body.address_street,
      req.body.address_zip,
      parseInt(req.body.userID),
    ],
    function (error, results, fields) {
      console.log(error);
      console.log(results);
      res.redirect("/account");
    }
  );
});

app.use("/about", aboutRouter);
app.use("/find", findRouter);
app.use("/order", orderRouter);
app.use("/bakery", bakeryRouter);
app.use("/chooses", choosesRouter);
app.use("/editmenu", editMenuRouter);
app.use("/receive", receiveRouter);
app.use('/ownerlogin', ownerloginRouter);
app.use('/orderhistory', orderhistoryRouter);
app.use('/export', exportRouter);
app.use('/cart', cartRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
