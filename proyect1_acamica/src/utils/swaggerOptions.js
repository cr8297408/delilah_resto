const configs = require('../config');
const URL_SWAGGER = configs.swagger.URL_SWAGGER;
const PORT = configs.express.EXPRESS_PORT;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Proyecto 2; Delilah-Resto',
            description: 'proyecto de una api para el manejo de pedidos de restaurante de Delilah-Resto.',
            version: '1.0.1',
        },
        servers: [
            {
		    url: URL_SWAGGER,
                description: "server 1",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header'
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerOptions;
