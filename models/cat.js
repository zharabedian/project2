
var orm = require("../config/orm.js");

var cat = {
  all: function(condition, cb) {
    orm.all("candidates", "notes", condition, function(res) {
      cb(res);
    });
  },

  create: function(cols, vals, cb) {
    orm.create("notes", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("notes", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("notes", condition, function(res) {
      cb(res);
    });
  }
};


module.exports = cat;