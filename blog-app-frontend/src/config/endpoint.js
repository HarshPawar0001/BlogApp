const ENDPOINT = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/api' // <--- CHANGE THIS PORT TO 8000
  : 'https://blog-app-backend-tydx.onrender.com/api';

export { ENDPOINT };