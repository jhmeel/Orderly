import logger from '../utils/logger.js'

// Log a request middlewear
const logRequest = (req, res, next)=> {
  const ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const logMessage = `@${ip_address} => ${req.method}:${req.url}:${res.statusCode}`;
  logger.info(logMessage);
  next();
}

export default logRequest