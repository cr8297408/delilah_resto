const { config } = require('dotenv');

config();

const configs = {
    database: {
        DB_HOST: process.env.DB_HOST,
        DB_NAME: process.env.DB_NAME,
        DB_PORT: process.env.DB_PORT,
    },
    security: {
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_ALGORITHMS: process.env.JWT_ALGORITHMS,
    },
    express: {
        EXPRESS_PORT: process.env.PORT,
    },
    swagger: {
        URL_SWAGGER: process.env.URL_SWAGGER,
    },
    google: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_CALLBACK: process.env.GOOGLE_CALLBACK,
    }
};

module.exports = configs;
