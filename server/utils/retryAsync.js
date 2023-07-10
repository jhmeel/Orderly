import util from 'util';
import ErrorHandler from '../handlers/errorhandler.js'
import logger from './logger.js'

const asyncRetry = (maxRetry) => {
  return function retryDecorator(asyncFunc) {
    return async function wrapper(...args) {
      let errorCount = 0;
      while (errorCount <= maxRetry) {
        try {
          const result = await asyncFunc(...args);
          return result;
        } catch (e) {
          errorCount += 1;
          logger.error(`Error occurred: ${e}. Retrying ${errorCount} of ${maxRetry}...`);
          await util.promisify(setTimeout)(3000); // wait for 3 second before retrying
        }
      }
      throw new ErrorHandler(`Failed after ${maxRetry} retries`); // raise error if all retries failed
    };
  };
}

export default asyncRetry