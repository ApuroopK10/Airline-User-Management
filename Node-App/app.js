const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Connect to database
connectDB();

const authenticateRoute = require("./routes/authenticate-route");
const userOpsRoute = require("./routes/user-operations-route");
// added cors options
const corsOptions = {
  origin: "*",
  allowHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "X-Response-Time",
    "Authorization",
  ],
  exposedHeaders: ["X-Response-Time"],
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

// app routes
app.use("/authenticate", authenticateRoute);
app.use("/operations", userOpsRoute);

// to handle errors related to application
app.use(errorHandler);

// Catch uncaught exceptions and rejections
process.on("uncaughtException", (err) => {
  console.log("uncaughtException->", err);
  server.close(() => process.exit(1));
});

// App listening on port
const server = app.listen(3003, function () {
  console.log("Node-App listening on port 3003!");
});

// Catch unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection->", err);
  server.close(() => process.exit(1));
});
