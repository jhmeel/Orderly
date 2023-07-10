import Emitter from "../utils/emitter.js";
import logger from "../utils/logger.js";
import ErrorHandler from "../handlers/errorHandler.js";
import mongoose from "mongoose";

class DbProvider {
  constructor(config) {
    this.mongoose = mongoose;
    this._name = "<DATABASE_PROVIDER>";
    this.db_url = config.DB.URL;
    this.emitter = Emitter.getInstance();
     this.connection = null
  }

  async init() {
    try {
      logger.info(`initializing ${this._name}...`);

      this.connection = await this.mongoose.connect(this.db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.emitter.emit(`${this._name}Ready`);

      logger.info(`${this._name} initialized! `);
    } catch (err) {
      throw new ErrorHandler(err.message);
    }
  }

  async cleanUp() {
    try {
      await this.mongoose.close();
      logger.info("MongoDB connection closed.");
    } catch (err) {
      throw new ErrorHandler(err.message);
    }
  }
  static getInstance(config) {
    if (DbProvider.instance) {
      return DbProvider.instance;
    }
    DbProvider.instance = new DbProvider(config);
    return DbProvider.instance;
  }
}

export default DbProvider;
