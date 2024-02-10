const express = require("express");
require("dotenv").config;
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const role = require("../models/User");
const app = express();
// const { authorize } = require("../middlewares/roleGuard");
const authorizationFunction = (req, res, next) => {
  const Token =
    req.body.Token || req.query.Token || req.headers["x-access-token"];
  console.log(Token);

  if (!Token) {
    return res.status(403).json({ Error: "token not available" });
  }

  try {
    const decodedToken = jwt.verify(Token, secretKey);
    req.user = decodedToken;
    console.log(req.user.email);
    console.log(req.user.role);
    // authorize(req, res, next);
  } catch (error) {
    res.status(401).json({ Error: "invalid token" });
  }
  next();
};

module.exports = {
  authorizationFunction,
};
