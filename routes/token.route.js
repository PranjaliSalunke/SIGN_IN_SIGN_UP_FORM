const express = require("express");
const tokenRouter = express.Router();
require("dotenv").config;
const { tokenTest } = require("../controllers/token.ctrl");
const { authorizationFunction } = require("../middlewares/tokenMiddleware");
const { authorizeRoles } = require("../middlewares/roleGuard");

tokenRouter.post("/test", authorizationFunction, tokenTest);
tokenRouter.post(
  "/onlyadmin",
  authorizationFunction,
  authorizeRoles(["admin"]),

  tokenTest,
  (req, res) => {
    res.json({ message: "Sorry only Admin is allowed" });
  }
);
tokenRouter.post(
  "/superonly",
  authorizationFunction,
  authorizeRoles(["superuser"]),

  tokenTest,
  (req, res) => {
    res.json({ message: "Sorry only super user is allowed" });
  }
);
tokenRouter.post(
  "/hr",
  authorizationFunction,
  authorizeRoles(["hr"]),
  tokenTest,
  (req, res) => {
    res.json({ message: "Sorry only HR is allowed" });
  }
);
module.exports = tokenRouter;
