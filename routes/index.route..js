const express = require("express");
const usersRouter = require("./UserRoutes");
const tokenRouter = require("./token.route");
const indexRouter = express.Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/token", tokenRouter);

module.exports = indexRouter;
