import passport from 'passport';

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    done(err, {id: 'xxx'});
});

export default passport;