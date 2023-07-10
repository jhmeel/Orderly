import express from "express";
import session from "express-session";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import Config from "../config.js";
import errorMiddleware from "../middlewares/errorMiddleware.js";
import logRequest from "../middlewares/requestLogger.js";
import rateLimit from "express-rate-limit";
import Emitter from "../utils/emitter.js";
import logger from "../utils/logger.js";
import fileUpload from "express-fileupload";
import ErrorHandler from "../handlers/errorHandler.js";


const { s_secreteKey, s_maxAge } = Config.SESSION;
const { windowMs, max, message } = Config.RATE_LIMITER;

class MiddlewaresProvider {
  constructor(app) {
    this._name = "<MIDDLEWARES_PROVIDER>";
    this.app = app;
    this.emitter = Emitter.getInstance();
  }
  async init() {
    const limiter = rateLimit({
      windowMs,
      max,
      message,
    });

    try {
      logger.info(`initializing ${this._name}...`);

      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(cors());
      this.app.use(helmet());
      this.app.use(fileUpload())
      this.app.disable("x-powered-by");

      this.sess = session({
        secret: s_secreteKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
          sameSite: "none",
          path: "/",
          httpOnly: true,
          maxAge: 259200,
        },
      });

      if (this.app.get("env") === "production") {
        this.app.set("trust proxy", 1); 
        this.sess.cookie.secure = true;
      }
      this.app.use(this.sess);

          // Set up Passport.js
        this.app.use(passport.initialize());
        this.app.use(passport.session());

      this.app.use(errorMiddleware);
      this.app.use(logRequest);
      this.app.use(limiter);
      this.app.use(bodyParser.json());
      this.app.use(cookieParser());

      this.app.use(compression());


      this.emitter.emit(`${this._name}Ready`);
      logger.info(` ${this._name} initialized!`);
    } catch (err) {
      throw new ErrorHandler(err.message);
    }
  }
}
export default MiddlewaresProvider;
