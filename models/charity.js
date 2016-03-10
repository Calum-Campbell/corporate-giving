var mongoose = require("mongoose");

var charitySchema = mongoose.Schema({
    name: String ,
    votes: Array,
});

module.exports = mongoose.model("Charity", charitySchema);