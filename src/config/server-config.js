const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is missing in .env file");
}

module.exports = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(8),
    JWT_KEY: process.env.JWT_KEY,
    DB_SYNC: process.env.DB_SYNC
};
