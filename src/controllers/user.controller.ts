import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400, // a day
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Please. Send your email and password",
      });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "The user already exists" });
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json({
      success: true,
      content: newUser,
      message: "User created!",
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      content: error,
      message: "Error creating user",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.status(400).json({
        success: false,
        message: "Please. Send your email and password",
      });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User doesnt exist" });

    const isMatch = await user.comparePassword(req.body.password);
    isMatch
      ? res.status(200).json({
          success: true,
          content: createToken(user),
          message: "User logged succesfully",
        })
      : res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
  } catch (error) {
    return res.status(400).json({
      success: false,
      content: error,
      message: "Error!",
    });
  }
};
