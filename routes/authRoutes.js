const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout(); //passport attaches logout function to req which deletes all the cookies associated
        res.send(req.user); //send response undefined
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });


}