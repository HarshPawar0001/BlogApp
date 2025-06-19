// blog-app-frontend/src/config/endpoint.js

const ENDPOINT = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/api' // For local development
  : process.env.VITE_APP_API_URL; // <--- CHANGE THIS LINE! Use VITE_APP_API_URL

// Keep the console.log for a final check after deployment
console.log("ENDPOINT (from src/config/endpoint.js):", ENDPOINT);

export { ENDPOINT };