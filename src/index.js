const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./config/server-config')
const apiRoutes = require('./routes/index');

const startserver = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);
    app.listen(PORT, () => {
        console.log(`Server Started at ${PORT}`);
    });
}
startserver();
