const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const errorController = require("./routes/utils/errorController");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users/usersRouter");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

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
  res.json("error");
});
// error handler
// app.all("*", function (req, res, next) {
//   next(
//     new ErrorMessageHandlerClass(
//       `Cannot find ${req.originalUrl} on this server! Check your URL`,
//       404
//     )
//   );
// });

// app.use(errorController);

module.exports = app;
