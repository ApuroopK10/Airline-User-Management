const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");

// Connect to database
connectDB();

const authenticateRoute = require("./routes/authenticate-route");
// added cors options
const corsOptions = {
  origin: "*",
  allowHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "X-Response-Time",
  ],
  exposedHeaders: ["X-Response-Time", "Retry"],
};

//Enable CORS
app.use(cors(corsOptions));

// Parse requests of content type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 10000,
    extended: true,
  })
);

// Parse requests of content type - application/json
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.get("/test", (req, res) => {
  res.send("running on port 3000");
});

app.use("/authenticate", authenticateRoute);

// Catch uncaught exceptions and rejections
process.on("uncaughtException", (err) => {
  console.log("uncaughtException->", err);
});

// App listening on port
const server = app.listen(3001, function () {
  console.log("Node-App listening on port 3000!");
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection->", err);
  server.close(() => process.exit(1));
});
