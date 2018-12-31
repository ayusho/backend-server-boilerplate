const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport'); 

require('./models/User'); //to create a user schema on server start
require('./services/passport'); //include passport strategies on server start

const keys = require('./config/keys');

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,       //extracts cookie data
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize()); //study later   //pull user id out of cookie data and assigns that to req.session
app.use(passport.session()); //study later eg. add logout function in req object

require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
    if(err){
        console.log(err)
    }
    console.log(`Listening at port ${PORT}`);
});
