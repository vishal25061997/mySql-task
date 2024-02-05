const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router= express.Router()

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hashPassword,
      });
      res
        .status(201)
        .json({ message: " user registered successfully", user: newUser });
    } catch (error) {
      console.log(error);
      req.status(500).json({ message: "Internal error" });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "invalid credentials" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "invalid credentials" });
      }
      const token = jwt.sign({ userId: user.id, email: user.email }, "books", {
        expiresIn: "1h",
      });
      res.json({ message: "login successful", token });
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "internal server error"})
    }
})

module.exports= router