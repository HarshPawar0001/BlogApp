const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = require("./config/index");
const connectDB = require("./config/connectDb");
const routes = require("./routes/index");
const allowedOrigins = ["https://blog-web-application-psi.vercel.app"];

const corsOrigin = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials such as cookies
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
};
app.use(cors(corsOrigin));

app.use(express.json());

// set router
app.use("/api", routes);

const start = async () => {
  try {
    await connectDB();
    console.log("db connected...");

    app.listen(PORT, () => {
      console.log(`server connected on ${PORT} port.`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
