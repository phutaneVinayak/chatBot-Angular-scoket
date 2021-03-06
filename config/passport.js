var localStrategy = require('passport-local').Strategy
var User = require('../app/model/user.js')

module.exports = function(passport) {

	//serialize user
	passport.serializeUser(function(user, done) {
		done(null, user.id)
	})

	//desrializing the usr
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user)
		})
	})


	//passport local strategy 
	passport.use('local-signup', new localStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allow us to pass call back
	},
	function(req, email, password, done) {
		// asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
        	User.findOne({'local.email': email}, function(err, user) {
        		if(err){
        			return done(null, false, req.flash("signupMessage: error while in singup "))
        		}

        		if(user){
        			return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
        		} else {
        			 var newUser            = new User();
			   		 newUser.local.email    = email;
                     newUser.local.password = newUser.generateHash(password);

                     newUser.save(function(err) {
	                    if (err){
	                        throw err;
	                    }
	                    return done(null, newUser);
                	});
        		}
        	})
        })
	}))

	passport.use('local-signin', new localStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true 
	},
	function(req, email, password, done) {
		User.findOne({'local.email' : email}, function(err, user) {
			if(err){
				return done(null, false, req.flash('loginMessage', 'error while login please try again'))				
			}
			if(!user){
				return done(null, false, req.flash('loginMessage', 'user not found please signup'));
			}

			if(!user.validPassword(password)){
				return done(null, false, req.flash('loginMessage', 'password is incoorect'))
			}
			req.session.key = user;

			return done(null, user)
		})
	}))
}