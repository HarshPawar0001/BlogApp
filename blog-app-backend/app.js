const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = require("./config/index");
const connectDB = require("./config/connectDb");
const routes = require("./routes/index");

app.use(
  cors({
    credentials: true,
  })
);

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
