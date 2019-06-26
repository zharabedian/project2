var express = require("express");

var router = express.Router();

var cat = require("../models/donkey.js");

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));

});


router.get("/data/:username", function(req, res) {
  var condition = "username = '" + req.params.username + "'";
  
  cat.all(condition, function(data) {
    res.json({ candidates: data });

  });
});

router.post("/api/cats", function (req, res) {

  cat.create([
    "candidate_id", "username", "notes"
  ], [
      req.body.candidate_id, req.body.username, req.body.notes
    ], function (result) {
      res.json({  });
    });
});

router.put("/api/cats/:id", function (req, res) {
  var condition = "notes_id = " + req.params.id;
  var notes = req.body.notes;

  cat.update({
    notes: notes
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cats/:id", function (req, res) {
  var condition = "notes_id = " + req.params.id;

  cat.delete(condition, function (result) {
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