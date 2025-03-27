const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./config/server-config')

const startserver = async () => {
    const app = express();
    app.use(bodyParser.json);
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(PORT, async () => {
        console.log("Server Started....");
    });
}
startserver();
