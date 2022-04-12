const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('./utils/swaggerOptions');
const cors = require('cors');
// const helmet = require('helmet');

require('./models');
require('./elementosDefaultBD');
require('./services/google')

const registroRoute = require('./routes/Registrousuarios.route');
const productosRoute = require('./routes/productos.route');
const pedidosRoute = require('./routes/pedidos.route');
const mediosPago = require('./routes/mediosPago.route');
const estadosPedidos = require('./routes/estadosPedidos.route');
const healthCheck = require('./routes/health-check.route');
const authRoute = require('./routes/auth/google');

const expressJWT = require('./JWT');
const configs = require('./config');

const PORT = configs.express.EXPRESS_PORT;

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

const app = express();

// app.use(helmet());

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use(expressJWT);

app.use('/usuarios', registroRoute);
app.use('/productos', productosRoute);
app.use('/mediospago', mediosPago);
app.use('/pedidos', pedidosRoute);
app.use('/estadosPedidos', estadosPedidos);
app.use('/health-check', healthCheck);
app.use('/google', authRoute)


// PRUEBA DE AUTH CON GOOGLE
app.get('/failed', (req, res) => res.send('Hay un error en el login'));
app.get('/success', (req, res) =>  res.send('login exitoso'));

app.listen(PORT, () => {
    console.log('escuchando en el puerto ' + PORT);
});

module.exports = app;
