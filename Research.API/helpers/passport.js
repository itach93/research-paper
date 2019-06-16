var passport = require('passport');
const passportJWT = require('passport-jwt');

const jwtSecret = require('../config/jwtConfig');
const UserService = require('../services/UserService');

// ExtractJwt to help extract the token
const ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = jwtSecret.secret;

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = UserService.getUserById({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

// use the strategy
passport.use(strategy);

module.exports = passport;