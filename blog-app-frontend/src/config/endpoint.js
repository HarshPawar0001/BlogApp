// blog-app-frontend/src/config/endpoint.js
// blog-app-frontend/src/config/endpoint.js
// console.log("Vercel Build Environment Variables:", process.env);

// const ENDPOINT = process.env.NODE_ENV === 'development'
//   ? 'http://localhost:8000/api' // For local development
//   : process.env.VITE_APP_API_URL; // <--- CHANGE THIS LINE! This will take the URL from Vercel's env var.

// // You can keep the console.log for a final check after deployment
// console.log("ENDPOINT (from src/config/endpoint.js):", ENDPOINT);

// export { ENDPOINT };

const ENDPOINT = "https://blog-app-backend-pied-eta.vercel.app/api"; // <-- Use YOUR actual deployed backend URL
// No need for process.env.NODE_ENV check here if you always want it to be the deployed URL

console.log("ENDPOINT (hardcoded in endpoint.js):", ENDPOINT); // Optional: for client-side console check

export { ENDPOINT };