var serialize = require("../helpers/serialize");
var rp        = require("request-promise");
var base_url  = "https://api.globalgiving.org"
var mongoose = require("mongoose");
var config   = require("../config/config");
var Theme = require("../models/theme");
var Project = require("../models/project");

mongoose.connect(config.database);

// var path      = "/api/public/projectservice/all/projects/active"
var themePath = "/api/public/projectservice/themes"

var initialParams = {
  api_key: "a310a8b0-2e3a-4c23-aedf-ec13bf0e00a3",
}


// var url = createUrl(base_url, path, initialParams);
var themeUrl = createUrl(base_url, themePath, initialParams);

// scrape(url);
themeScrape(themeUrl);

function themeScrape(Url) {
  return rp({
    method: "get",
    url: url,
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(res){
    var themes = JSON.parse(res).themes;

    themes.theme.forEach(function(theme){
      var newTheme = new Theme(theme)
      newTheme.save(function(err){
        console.log(err)
        if (err) return res.status(500).json({message: "Something went wrong!"});
        res.status(201).json({message: 'Theme successfully added.', theme: theme});
      })
    })
  })
}


function scrape(url) {
  return rp({
    method: "get",
    url: url,
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(res){
    var projects = JSON.parse(res).projects;

    projects.project.forEach(function(project){
      console.log(project)

      var newProject = new Project()
      newProject.projectId = project.id
      newProject.organization= project.organization.name;
      newProject.title = project.title;
      newProject.summary = project.summary;
      newProject.contactCity = project.contactCity;
      newProject.contactCountry = project.contactCountry;
      newProject.contactPhone = project.contactPhone;
      newProject.contactUrl = project.contactUrl;
      newProject.projectLink = project.projectLink;
      newProject.progressReportLink = project.progressReportLink;
      newProject.themeName = project.themeName;
      newProject.country = project.country;
      newProject.iso3166CountryCode = project.iso3166CountryCode;
      newProject.region = project.region;
      newProject.goal = project.goal;
      newProject.funding = project.funding;
      newProject.remaining = project.remaining;
      newProject.numberOfDonations = project.numberOfDonations;
      newProject.need = project.need;
      newProject.longTermImpact = project.longTermImpact;
      newProject.activities = project.activities;
      newProject.imageLink = project.imageLink;
      newProject.longitude = project.longitude;
      newProject.latitude = project.latitude;
      newProject.logoUrl = project.organization.logoUrl;

      newProject.save(function(err){
       if (err) return res.status(500).json({message: "Something went wrong!"});
       res.status(201).json({message: 'Project successfully added.', project: project});
     })

      if (projects.hasNext) {
        var newParams = initialParams;
        initialParams.nextProjectId = projects.nextProjectId;
        var url = createUrl(base_url, path, newParams);
        return scrape(url);
      } else {
        return process.exit();
      };
    });
  })
};

function createUrl(base_url, path, params){
  return url = base_url + path + "?" + serialize(params)
}