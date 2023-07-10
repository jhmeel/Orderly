 import Emitter from './utils/emitter.js'
 import logger from './utils/logger.js'
 import ErrorHandler from './handlers/errorHandler.js'
 import asyncRetry from './utils/retryAsync.js'

 class Core {
     constructor(app, config) {
         logger.info(`starting Core: V${config.VERSION}`)

         this.dependencies = {};
         this.readyPercentage = 0;
         this.config = config;
         this.RETRIES = this.config.ASYNC_RETRIES;
         this.emitter = Emitter.getInstance();
         this.app = app;
         this.port = this.config.PORT;
     } 
  
     initServer() {
         this.app.listen(this.port, () => {
             this.emitter.emit("@server:READY:STATE=100%");
             logger.info(`server running on:${this.port}`);
         });
     }
 
     addDependency(dependencies) {
         for(const dependency of dependencies){
            this.dependencies[dependency._name] = dependency;
            this.listenForDependencyReady(dependency._name);
         }
       
     }

     listenForDependencyReady(name) {
         logger.info(`@Core:Listening for ${name} ready state...`);
         this.emitter.on(`${name}Ready`, () => {
             this.dependencies[name] = true;
             logger.info(`${name} is ready`)
             this.updateReadyPercentage();
         });
     }

     startPolling() {
        const intervalId = setInterval(() => {
             if (this.readyPercentage === 100) {
                logger.info('server is 100% ready!!')
                 logger.info("Boostrapping server...");
                 this.initServer();
                 clearInterval(intervalId)
             } else {
                 logger.info(`@Core:Server is ${this.readyPercentage}% ready...`);
             }
         }, 500);
         return this
     }

     updateReadyPercentage() {
         const numOfDependencies = Object.keys(this.dependencies).length;
         const numOfReadyDependencies = Object.values(this.dependencies).filter(status => status === true).length;
         this.readyPercentage = Math.round((numOfReadyDependencies / numOfDependencies) * 100);
     }

     static getInstance(app, config) {
         if (!Core.instance) {
             Core.instance = new Core(app, config);
         }
         return Core.instance;
     }

     async initializeDependencies() {
         if (!this.dependencies) return new Errorhandler('@Core:invalid dependencies... ');
         try {
             for (const [name, dependency] of Object.entries(this.dependencies)) {
                
                asyncRetry(this.RETRIES)(dependency.init())
             }
             return this
         } catch (error) {
             throw new ErrorHandler(`@Core: Error initializing dependencies: ${error.message}`);
         }
     }


     async listenForInterruptionHaltAndRestart(dependencyList) {
     process.on('SIGINT', () => {
              this.restartServer(dependencyList);
         });
     }




     shutdown(reason) {
         try {
             logger.info(`@Core:shutting down system:reason: ${reason}`)
             this.emitter.emit('@Core:Dependency:Shutdown')

             this.app = undefined
             this.dependencies = {}
             this.readyPercentage = 0
         } catch (err) {
             logger.error(`@Core:Error in shutting down server: ${err.message}`)
         }

     }

     async restartServer(dependencyList) {
         // close server connection
         try {
             this.app.close(() => {
                 logger.info('Server connection closed. Restarting server...');

                 // reset dependencies and ready percentage
                 this.dependencies = {};
                 this.readyPercentage = 0;
                   this.addDependency(dependencyList)
                  this.initializeDependencies().startPolling()
             });


         } catch (err) {
             throw new ErrorHandler(err.message)
         }
     }


 }

 export default Core;

