var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const connection = require('./database');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var ownerRouter = require("./routes/owner");
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
var app = express();

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
app.use("/owner", ownerRouter);
app.use("/signup", signupRouter);

function done(err, user) {
  res.redirect('/find');
}
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "450927576549-gstvnstsb2taa9qfqda3f14fusjrfqsj.apps.googleusercontent.com",
      clientSecret: "UPgRFeHYJC7i4Ed1tAGWCz4Y",
      callbackURL: "/login/callback",
    },
    function(accessToken, refreshToken, profile, done) {
     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      //});
      //MADE UP FUNCTION
    }
  )
);
app.use(
  "/login/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/find");
  }
);

app.use(
  "/login",
  passport.authenticate("google", {
    scope: "profile email openid",
  })
);

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

module.exports = app;
