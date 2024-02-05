const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const router = require("./routes");
const { User, sequelize } = require("./db.js");

const app = express();

app.use(express.json())

app.use("/user", router)


 
sequelize
  .sync()
  .then(() => {
    app.listen(4200);
    console.log("synchronized");
  })
  .catch((error) => {
    console.log(error);
  });
