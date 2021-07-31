const express = require("express");
const Ninja = require("../models/ninja");
const router = express.Router();

// get a list of ninja from data base
router.get("/ninjas", function (req, res) {
  // to find all ninjas
  // Ninja.find({}).then((ninjas)=>{ // res.send(ninjas) // })
  Ninja.aggregate()
    .near({
      near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
      maxDistance: 100000,
      spherical: true,
      distanceField: "dist.calculated",
    })
    .then((ninjas) => {
      res.send(ninjas);
    }).catch(error=>{
        console.log(error)
        res.send(error)
    });
});
// ADD NINJA
router.post("/ninjas", function (req, res, next) {
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});
// UPDATE
router.put("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
      res.send(ninja);
    });
  });
});
// DELETE NINJA
router.delete("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndRemove({ _id: req.params.id }).then(function (ninja) {
    res.send(ninja);
  });
});

module.exports = router;
