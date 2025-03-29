const express = require('express')
const bodyParser = require('body-parser')
const { PORT, DB_SYNC } = require('./config/server-config')
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const startserver = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);
    app.listen(PORT, () => {
        console.log(`Server Started at ${PORT}`);
        if (DB_SYNC) {
            db.sequelize.sync({
                alter: true
            })
        }
    });
}
startserver();
