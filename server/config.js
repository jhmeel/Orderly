import dotenv from 'dotenv'

dotenv.config()

const Config = {
    NAME: process.env.SYS_NAME || "<ORDERLY>",
    PORT: process.env.PORT || 4000,
    ASYNC_RETRIES: 3,
    CYPHER_KEY: process.env.CYPHER_KEY,
    RATE_LIMITER: {
        windowMs: '',
        max: 100,
        message: 'Too Many Request From This Ip, Please Try Again Later!'
    }, 
    SESSION: {
        s_secreteKey:process.env.SESSION_SECRETE_KEY ,
        s_maxAge : process.ENV.SESSION_MAX_AGE
    },
    LOGGER: {
        maxFileSize: 10 << 20, //,10mb
        logstoragePath: "logs/server.log",
        maxFiles: 5,
      },
      OAUTH: {
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRETE ,
        callbackURL: `http://localhost:${4000}/auth/google/callback`,
      },
      RESET_PASSWORD_EXPIRY: Date.now() + 5 * 60 * 1000, //5mins
      CLOUDINARY: {
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
         CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
         CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
      },
      DB:{
        URL: process.env.DB_URL
      }
}


export default Config