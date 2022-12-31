const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/config.env" });

const User = require("./models/userModel");
const event = require("./models/eventModel");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Routes
const userRoute = require("./routes/userRoutes");
const eventRoute = require("./routes/eventRotue");
app.use("/api/v1", userRoute);
app.use("/api/v1", eventRoute);

User.sync({ alter: true });
event.sync({ alter: true });

module.exports = app;
