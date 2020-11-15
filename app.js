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

function done(err, user) {
  res.redirect("/find");
}

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "450927576549-gstvnstsb2taa9qfqda3f14fusjrfqsj.apps.googleusercontent.com",
      clientSecret: "UPgRFeHYJC7i4Ed1tAGWCz4Y",
      callbackURL: "/login/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
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
);

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
  passport.authenticate("google", { failureRedirect: "/index" }),
  function (req, res) {
    if (req.user.new) {
      return res.redirect("/account");
    }
    res.redirect("/index");
  }
);

app.use(
  "/login",
  passport.authenticate("google", {
    scope: "profile email openid",
  })
);

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
