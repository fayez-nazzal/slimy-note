const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const mongo = require("./mongo");
const apiRouter = require("./routes/api-router");
const authRoutes = require("./routes/auth");
const passport = require("passport");
const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    expires: false,
    maxAge: 24 * 60 * 60 * 365 * 1000,
    keys: ["dfdfdsfd"],
  })
);

app.use(passport.initialize());

app.use(passport.session());

const passportSetup = require("./config/passport-setup");

app.use(
  require("cors")({ credentials: true, origin: "http://localhost:3002" })
);
app.use("/api", apiRouter);

app.use("/auth", authRoutes);

app.use(express.static("./client/build"));

app.set("view engine", "pug");

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

mongo.connect();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
