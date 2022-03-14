const mongoose = require('mongoose');

const configs = require('../config');

const DB_HOST = configs.database.DB_HOST;


(async () => {
    const db = await mongoose.connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a la BD');
})();
