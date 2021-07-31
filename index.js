const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/api");
// set up express app
const app = express();
//conect to mongodb

mongoose.connect("mongodb://localhost/ninjago");
mongoose.Promise = global.Promise;
// this is bodyparser
app.use(
  express.json({
    extended: true,
  })
);
// initialise routes
app.use("/api", routes);
// error handlying midleware
app.use(function (err, req, res, next) {
    // console.log(err);
    res.status(422).send({error:err.message})
});

// listen for requeste
app.listen(process.env.port || 4000, function () {
  console.log("now listening for cool ");
});
