var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var model = require("../models/cat.js");

// Doesn't have username functionality
// Need to capture username in a variable and pass it here
// 
router.get("/:username", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));

  var condition = req.params.username;

  model.all({
    username: username
  },
    (function (req, res) {
      res.json({ res });
    })
)});

// Add a note
router.post("/api/cats/:id", function (req, res) {

  var condition = "candidate_id = " + req.params.id;

  model.create([
    "candidate_id", "username", "notes"
  ], [
      condition,
      // change this to come from local storage
      req.body.username,
      req.body.notes
    ], function (result) {
      // tbd. some part of the object
      res.json({});
    });
});

router.put("/api/add/:notes_id", function (req, res) {
  var condition = "notes_id = " + req.params.id;

  model.update({
    notes: req.body.notes
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/add/:notes_id", function (req, res) {
  var condition = "notes_id = " + req.params.notes_id;

  model.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
