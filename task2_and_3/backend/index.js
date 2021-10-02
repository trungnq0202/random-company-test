/**
 * Module dependencies.
 */
const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const userRounter = require("./routers/user");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
require("dotenv").config({ path: ".env" });

/**
 * Create Express server.
 */
const app = express();
app.use(express.json());
app.use(userRounter);

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/**
 * Express configuration.
 */
app.set("host", process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0");
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
