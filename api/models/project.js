var mongoose = require("mongoose");

var projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  need: { type: String, required: true },
  themeName: { type: String, required: true },
  summary: { type: String, required: true },
  imageLink: { type: String, required: true },
});

module.exports = mongoose.model('Project', projectSchema);