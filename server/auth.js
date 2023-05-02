import { user } from "./user.js";

import passport from "passport";
import passportLocal from "passport-local";

const { Strategy } = passportLocal;

const strategy = new Strategy(
    async (username, password, done) => {
        const userData = await user.validateUser(username, password);
        switch (userData) {
            case "INVALID_USER":
                return done(null, false, { message: `<${username}> user not found` });
            case "INVALID_PASSWORD":
                // delay return to rate-limit brute-force attacks
                // delay two seconds
                await new Promise((r) => setTimeout(r, 2000));
                return done(null, false, { message: `<${username}> invalid password` });
            default:
                return done(null, userData);
        }
    }
);

passport.use(strategy);
passport.serializeUser(
    (user, done) => done(
        null,
        {
            username: user["username"],
            role: user["role"]
        }
    )
);
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
