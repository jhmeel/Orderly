import cloudinary from "cloudinary";
import Emitter from "../utils/emitter.js";
import logger from "../utils/logger.js";
import ErrorHandler from "../handlers/errorHandler.js";

class CloudinaryProvider {
  constructor(config) {
    this._name = "<CLOUDINARY_PROVIDER>";
    this.emitter = Emitter.getInstance();
    this.config = config;
  }
  async init() {
    try {
      logger.info(`initializing ${this._name}...`);

      cloudinary.config({
        cloud_name: this.config.CLOUDINARY.CLOUDINARY_NAME,
        api_key: this.config.CLOUDINARY.CLOUDINARY_API_KEY,
        api_secret: this.config.CLOUDINARY.CLOUDINARY_API_SECRET,
      });

      this.emitter.emit(`${this._name}Ready`);

      logger.info(`${this._name} initialized! `);
    } catch (err) {
      throw new ErrorHandler(err.message);
    }
  }

}

export default CloudinaryProvider
