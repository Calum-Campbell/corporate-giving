var mongoose = require("mongoose");

var themeSchema = mongoose.Schema({
  id: {type: String},
  name: { type: String}
});

module.exports = mongoose.model('Theme', themeSchema);