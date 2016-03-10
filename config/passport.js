var LocalStrategy = require("passport-local").Strategy;
var User          = require("../models/user");

module.exports = function(passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    credit: "credit",
    company: "company",
    passReqToCallback: true,
  }, function(req, email, password, done) {

    // Find a user with this email
    User.findOne({ 'local.email' : email }, function(err, user) {
      // Error found
      if (err) return done(err, false, { message: "Something went wrong." });

      // No error but already an user registered
      if (user) return done(null, false, { message: "Please choose another email." });

      var newUser            = new User();
      newUser.local.email    = email;
      newUser.local.credit   = 100;
      newUser.local.company  = req.body.company;
      newUser.local.username = req.body.username;
      newUser.local.password = User.encrypt(password);

      newUser.save(function(err, user) {
        // Error found
        console.log(err)
        if (err) return done(err, false, { message: "Something went wrong." });
        
        // New user created
        return done(null, user);
      });
    });
  }));
  
}