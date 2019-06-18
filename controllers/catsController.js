var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var model = require("../models/cat.js");

// Doesn't have username functionality
// Need to capture username in a variable and pass it here
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  model.all(function(data) {
    res.json({ cats: data });
  });
});

// // Create all our routes and set up logic within those routes where required.
// router.get("/data", function(req, res) {
//   model.all(function(data) {
//     res.json({ cats: data });
//   });
// });

router.post("/api/add/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  
  model.create([
    "candidate_id", "username", "notes"
  ], [
    condition, 
    // username would go here.  
    req.body.notes
  ], function(result) {
    // Send back something
    res.json({  });
  });
});

router.put("/api/add/:notes_id", function(req, res) {
  var condition = "notes_id = " + req.params.id;

  model.update({
    notes: req.body.notes
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/add/:notes_id", function(req, res) {
  var condition = "notes_id = " + req.params.notes_id;

  cat.delete(condition, function(result) {
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
