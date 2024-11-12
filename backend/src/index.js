require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const userRoutes = require("../routes/user.routes");

const app = express();
const port = process.env.PORT;

//middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/v1", userRoutes);

//listening
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
