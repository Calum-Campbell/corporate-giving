var mongoose = require("mongoose");

var themeSchema = mongoose.Schema({
  id: String,
  name: String
});

module.exports = mongoose.model('Theme', themeSchema);