import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import OAuthUser from "../models/oauthUserModel.js";
import catchAsync from "../middlewares/catchAsync.js";
import { welcomeMsg } from "../utils/templates.js";
import ErrorHandler from "../handlers/errorHandler.js";
import { createSession } from "../providers/sessionProvider.js";
import Config from "../config.js";
import Emitter from "../utils/emitter.js";
import logger from "../utils/logger.js";
const { clientID, clientSecret, callbackURL } = Config.OAUTH;

class ConfigurePassport {
  constructor(app) {
    this._name = "<OAUTH_PROVIDER>";
    this.app = app;
    this.emitter = Emitter.getInstance();
    this.passport = passport;
  }

  serializeUser() {
    this.passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  }

  async deserializeUser() {
    this.passport.deserializeUser(async (id, done) => {
      const user = await OAuthUser.findById(id);
      done(null, user);
    });
  }

  async configureGoogleStrategy() {
    try {
      const strategy = new GoogleStrategy(
        {
          clientID,
          clientSecret,
          callbackURL,
        },
        catchAsync(async (accessToken, refreshToken, profile, done) => {
          try {
            // Find or create user
            const user = await OAuthUser.findOne({ googleId: profile.id });

            if (!user) {
              const newUser = {
                googleId: profile.id,
                username: profile.displayName,
                role: Roles.CASUAL,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
              };
              await OAuthUser.create(newUser);
               //createSession
              sendEmail(
                newUser.email,
                welcomeMsg.subject,
                welcomeMsg.body(newUser.username)
              );

              done(null, newUser);
            } else {
              done(null, user);
            }
          } catch (error) {
            done(error, null);
          }
        })
      );

      this.passport.use(strategy);
    } catch (error) {
      throw new ErrorHandler(error.message);
    }
  }

  async init() {
    try {
      logger.info(`initializing ${this._name}...`);

      this.serializeUser();
      await this.deserializeUser();
      await this.configureGoogleStrategy();

      this.emitter.emit(`${this._name}Ready`);
      logger.info(`${this._name} initialized!`);
    } catch (error) {
      throw new ErrorHandler(error.message);
    }
  }
}

export default ConfigurePassport;
