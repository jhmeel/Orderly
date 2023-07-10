import express from "express";
import Core from "./Core.js";
import dotenv from "dotenv";
import DbProvider from "./providers/dbProvider.js";
import MiddlewaresProvider from "./providers/middlewaresProvider.js";
import Config from "./config.js";
import RoutesProvider from "./providers/routeProvider.js";
//import configurePassport from "./handlers/oauth.js";
import CloudinaryProvider from "./providers/cloudinaryProvider.js";
//import WhatsappProvider from "./providers/whatsappProvider.js";

dotenv.config();

const app = express();

const dependencyList = [
  DbProvider.getInstance(Config),
  new CloudinaryProvider(Config),
  //WhatsappProvider.getInstance(Config),
  new MiddlewaresProvider(app),
  new RoutesProvider(app),
  //new configurePassport(app),
];

//BOOTSTRAP SERVER
const core = Core.getInstance(app, Config);

core.addDependency(dependencyList);
core.initializeDependencies();
core
  .startPolling()
  .listenForInterruptionHaltAndRestart(dependencyList);
