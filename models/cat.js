
var orm = require("../config/orm.js");

var cat = {
  all: function(condition, cb) {
    orm.all("candidates", "notes", condition, function(res) {
      cb(res);
    });
  },

  create: function(cols, vals, cb) {
    orm.create("candidates", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("candidates", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("candidates", condition, function(res) {
      cb(res);
    });
  }
};


module.exports = cat;