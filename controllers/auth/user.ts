import type { Request, Response } from "express";

const {
  User,
  registerValidate,
  loginValidate,
} = require("../../models/auth/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.authUser = async (req: Request, res: Response) => {
  const { error } = loginValidate(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email or password is wrong");
  } else {
    const { password, email } = req.body;

    // Check if password is provided in the request body
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!password || !user?.password) {
      throw new Error("Password or user password is missing");
    }

    if (typeof password !== "string" || typeof user?.password !== "string") {
      return res.status(500).json({ message: "Invalid password data" });
    }

    if (!user?.password.startsWith("$2")) {
      return res
        .status(500)
        .json({ message: "Stored password hash is invalid" });
    }

    const isSuccess = await bcrypt.compare(password, user?.password);

    if (!isSuccess) {
      return res.status(400).send("Email or password is wrong !");
    } else {
      const token = user.createAuthToken();
      res.header("x-auth-token", token).send(token);

      // return res.status(200).json({ message: "Login Succesfull" });
    }
  }
};

exports.userAdd = async (req: Request, res: Response) => {
  const { error } = registerValidate(req.body);

  if (error) {
    res.status(400).send(error.message);
  } else {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(401).send("this user already exists");
    } else {
      if (req.body.role == "admin") {
        return res
          .status(403)
          .send(
            "ERROR! You're doing something you don't have the authority to do!"
          );
      } else {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User(req.body);
        user.password = hashPassword;

        const token = user.createAuthToken();
        const result = await user.save();

        res.status(201).header("x-auth-token", token).json(result);
      }
    }
  }
};

exports.userList = async (req: Request, res: Response) => {
  const user = await User.find();
  res.status(200).send(user);
};

exports.singleUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};
