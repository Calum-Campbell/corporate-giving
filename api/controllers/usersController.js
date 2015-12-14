var User    = require('../models/user');
var Project = require('../models/project');
var Theme = require('../models/theme');

function usersIndex(req, res) {
  User.find(function(err, users){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ users: users });
  });
}

function usersShow(req, res){
  User.findById(req.params.id, function(err, user){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ user: user });
  });
}

function usersUpdate(req, res){
  User.findById(req.params.id,  function(err, user) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!user) return res.status(404).json({message: 'No user found.'});

    if (req.body.email) user.local.email = req.body.name;
    if (req.body.password) user.local.password = req.body.password;

    user.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

     res.status(201).json({message: 'User successfully updated.', user: user});
   });
  });
}

//Add projects to user/////

function usersAddProject(req, res){
  var userId = req.params.id;
  var projectId = req.body.projectId;
  User.findOne({_id: userId}, function(err, user){
    Project.findOne({_id: projectId}, function(err, project){
      user.projects.push(project);
      user.save(function(err){
        if (err) return res.status(500).json({message: "Something went wrong!"});

        res.status(201).json({message: 'Project successfully added.', user: user});
      });

    });
  });
}


function usersRemoveProject(req, res){
  var userId = req.params.id;
  var projectId = req.body.projectId;
  User.findOne({_id: userId}, function(err, user){
    Project.findOne({_id: projectId}, function(err, project){
      var projectIndex = user.projects.indexOf(project)
      user.projects.splice(projectIndex,1);
      user.save(function(err){
        if (err) return res.status(500).json({message: "Something went wrong!"});

        res.status(201).json({message: 'Project successfully removed.', user: user});
      });

    });
  });
}

//Add themes to user ////

function usersAddTheme(req, res){
  var userId = req.params.id;
  var themeId = req.body.themeId;
  console.log(themeId)
  User.findOne({_id: userId}, function(err, user){
    console.log(user)
    Theme.findOne({_id: themeId}, function(err, theme){
      user.themes.push(theme);
      user.save(function(err){
        if (err) return res.status(500).json({message: "Something went wrong!"});

        res.status(201).json({message: 'Theme successfully added.', user: user});
      });

    });
  });
}


function usersRemoveTheme(req, res){
  var userId = req.params.id;
  var themeId = req.body.themeId;
  User.findOne({_id: userId}, function(err, user){
    Theme.findOne({_id: themeId}, function(err, theme){
      var themeIndex = user.themes.indexOf(theme)
      user.themes.splice(themeIndex,1);
      user.save(function(err){
        if (err) return res.status(500).json({message: "Something went wrong!"});

        res.status(201).json({message: 'Theme successfully removed.', user: user});
      });

    });
  });
}

function usersDelete(req, res){
  User.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'User has been successfully deleted'});
 });
}

module.exports = {
  usersIndex:  usersIndex,
  usersShow:   usersShow,
  usersUpdate: usersUpdate,
  usersAddProject: usersAddProject,
  usersRemoveProject: usersRemoveProject,
  usersAddTheme: usersAddTheme,
  usersRemoveTheme: usersRemoveTheme,
  usersDelete: usersDelete
}