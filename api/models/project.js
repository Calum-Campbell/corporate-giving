var mongoose = require("mongoose");

var projectSchema = mongoose.Schema({ 
          projectId: {type: Number},
          organization: {type: String},
          title: {type: String},
          summary: {type: String},
          contactCity: {type: String},
          contactCountry: {type: String},
          contactPhone: {type: String},
          contactUrl: {type: String},
          projectLink: {type: String},
          progressReportLink: {type: String},
          themeName: {type: String},
          country: {type: String},
          iso3166CountryCode: {type: String},
          region: {type: String},
          goal: {type: Number},
          funding: {type: Number},
          remaining: {type: Number},
          numberOfDonations: {type: Number},
          need: {type: String},
          longTermImpact: {type: String},
          activities: {type: String},
          imageLink: {type: String},
          longitude: {type: Number},
          latitude: {type: Number}
          })
      


module.exports = mongoose.model('Project', projectSchema);