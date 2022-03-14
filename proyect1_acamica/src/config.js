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
};

module.exports = configs;
