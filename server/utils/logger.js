import winston from 'winston';
import Config from '../config.js'

const { createLogger, transports } = winston;
const { combine, colorize, timestamp, printf } = winston.format;

const {logstoragePath, maxFiles, maxFileSize}  = Config.LOGGER;

// Define the log format
const logFormat = combine(
   colorize({
        all: true,
    }),
  timestamp(),
  printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Create a new logger with a rotating file transport
const logger = createLogger({
  level: 'debug',
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: logstoragePath,
      maxFiles: maxFiles,
      maxsize: maxFileSize
    })
  ]
});







export default logger;