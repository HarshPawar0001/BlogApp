const dotenv = require("dotenv");
dotenv.config();
 
const data = {
    PORT,
    DB_URL,
    JWT_SECRET_KEY,
} = process.env;

module.exports = data;