var mongoose = require("mongoose");

var themeSchema = mongoose.Schema({
  name: { type: String}
});

module.exports = mongoose.model('Theme', themeSchema);