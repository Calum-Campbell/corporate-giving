var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var charitySchema = mongoose.Schema({
  local: {
    name: { type: String },
    votes: { type: Array}
  }
});

module.exports = mongoose.model("Charity", charitySchema);