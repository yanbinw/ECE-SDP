import { users } from "./users.js";

import passport from "passport";
import passportLocal from "passport-local";

const { Strategy } = passportLocal;

const strategy = new Strategy(
    async (username, password, done) => {
        if (!users.findUser(username)) {
            // no such user
            return done(null, false, { message: 'Wrong username' });
        }
        if (!users.validatePassword(username, password)) {
            // invalid password
            // should disable logins after N messages
            // delay return to rate-limit brute-force attacks
            await new Promise((r) => setTimeout(r, 2000)); // two second delay
            return done(null, false, { message: 'Wrong password' });
        }
        // success!
        return done(null, username);
    }
);

passport.use(strategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((uid, done) => done(null, uid));

export default {
    configure: (app) => {
        app.use(passport.initialize());
        app.use(passport.session());
    },
    authenticate: (domain, where) => {
        return passport.authenticate(domain, where);
    }
};