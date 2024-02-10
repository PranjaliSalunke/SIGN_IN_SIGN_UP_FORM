//const { uploadImageToS3 } = require("../config/image-upload");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const express = require("express");
const app = express();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { create } = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    const user = req.body;

    const { username, password, name, email, role } = user;
    console.log(user);

    const emailSchema = Joi.string()
      .email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required();

    const { error: emailError } = emailSchema.validate(user.email);

    if (emailError) {
      return res
        .status(400)
        .send(
          "invalid mail format, your email id should must ends with .com or .net."
        );
    }

    const passwordSchema = Joi.string().pattern(new RegExp("^[a-zA-Z0-9]+$"));
    const { error: passError } = passwordSchema.validate(password);
    //console.log("invalid password", passError);

    if (passError) {
      return res
        .status(400)
        .send(
          "invalid password format, you password should must contsin the numbers and letters"
        );
    }

    const hashpassword = await bcrypt.hash(password, 10);
    //console.log(hashpassword);
    //const image = req.file;
    // const imagekey = await uploadImageToS3(image);
    const user_obj = {
      username: username,
      password: hashpassword,
      name: name,
      email: email,
      role: role,
      //image: imagekey,
    };
    await create(user_obj);

    console.log("user saved successfully...!");
    res.status(201).send("user created successfully...!");
  } catch (error) {
    console.error("error saving user", error);
    res.status(500).send("error creating the user.");
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    //console.log(email, password);
    const user = await User.findOne({ email }).sort({ _id: -1 });

    if (!user) {
      return res.status(401).json({ error: "invalid mail" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    console.log(passMatch);
    if (!passMatch) {
      return res.status(401).json({ error: "invalid password" });
    }
    // if (user.role !== "admin") {
    //   console.log("Access Denied");
    //   return res.status(400).send("only admin is allowed");
    // }
    const payload = { email: user.email, role: user.role };

    const expiresIn = "1h";
    const token = jwt.sign(payload, secretKey, { expiresIn });

    res.status(200).json({ message: "login successful", token: token });
  } catch (error) {
    console.error("error during login", error);
    res.status(500).send("error during login");
  }
};

module.exports = {
  createUser,
  login,
};
