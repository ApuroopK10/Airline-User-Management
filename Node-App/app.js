const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

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

app.get("/", (req, res) => {
  res.send("running on port 3000");
});

// Catch uncaught exceptions and rejections
process.on("uncaughtException", (err) => {
  console.log("uncaughtException->", err);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection->", err);
});

// App listening on port
app.listen(3000, function () {
  console.log("Node-App listening on port 3000!");
});
