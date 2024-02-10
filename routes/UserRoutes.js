const express = require("express");
const usersRouter = express.Router();
// const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fileType = require("file-type-ext");
const { createUser, login } = require("../controllers/userControllers");
const { authorizationFunction } = require("../middlewares/tokenMiddleware");
// usersRouter.use(bodyParser.json());

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
usersRouter.post("/signup", createUser);
usersRouter.post("/login", login);

module.exports = usersRouter;
