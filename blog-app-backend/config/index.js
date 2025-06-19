// blog-app-backend/config/index.js

const dotenv = require("dotenv");
dotenv.config(); // This loads variables from your local .env file into process.env

module.exports = {
  // For PORT: Use the port provided by Vercel (process.env.PORT),
  // or default to 8000 if process.env.PORT is not set (e.g., during local development without a .env PORT).
  PORT: process.env.PORT || 8000,

  // DB_URL: Directly get the database URL from process.env.
  // This will be populated from your Vercel Environment Variables when deployed,
  // or from your local .env file when running locally.
  DB_URL: process.env.DB_URL,

  // JWT_SECRET_KEY: Directly get the JWT secret key from process.env.
  // This will be populated from your Vercel Environment Variables when deployed,
  // or from your local .env file when running locally.
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};