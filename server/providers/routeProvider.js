import Emitter from "../utils/emitter.js";
import logger from "../utils/logger.js";
import ErrorHandler from "../handlers/errorHandler.js";
import User from "../routes/userRoutes.js";
import Oauth from "../routes/oauthRoutes.js";
import Product from "../routes/productRoutes.js";
import healthcheck from "express-healthcheck";
import os from "os";

class RouteProvider {
  constructor(app) {
    this._name = "<ROUTES_PROVIDER>";
    this.app = app;
    this.emitter = Emitter.getInstance();
  }
  async init() {
    try {
      logger.info(`initializing ${this._name}...`);

      this.app.use("/api/v1", User);
      this.app.use("/api/v1", Oauth);
      this.app.use("/api/v1", Product);

      this.app.route("/api/v1/healthcheck").get(async (req, res, next) => {
        const MIN_UP_TIME = 60;
        const uptime = process.uptime();
        const is_healthy = uptime >= MIN_UP_TIME;
        const status = {
          status: is_healthy
            ? "UP"
            : uptime < MIN_UP_TIME && uptime > 0
            ? "INITIALIZING..."
            : "DOWN",
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          hostname: os.hostname(),
          cpu: os.cpus,
          cpuUsage: process.cpuUsage,
          memoryUsage: process.memoryUsage,
          loadAverage: os.loadavg(),
          freeMemory: os.freemem(),
          totalMemory: os.totalmem(),
        };
        res.status(200).json(status);
      }); 
      

      this.emitter.emit(`${this._name}Ready`);

      logger.info(`${this._name} initialized! `);
    } catch (err) {
      throw new ErrorHandler(err.message);
    }
  }
}

export default RouteProvider;
