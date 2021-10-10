import { Request, Response } from "express";
import User, { IUser } from "../models/user";
export const getAllUsers = async (
  req: Request | any,
  res: Response
): Promise<Response> => {
  try {
    let limit = parseInt(req.query?.limit);
    let offset = parseInt(req.query?.offset);
    console.log("limit", limit);
    console.log("offset", offset);
    if (!limit) limit = 0;
    if (!offset) offset = 0;
    const users = await User.find().skip(offset).limit(limit);
    const usersCount = await User.count();
    const totalPages = Math.ceil(usersCount / limit);
    const currentPage = Math.ceil(usersCount % offset);
    return res.status(200).json({
      success: true,
      result: users,
      paging: {
        total: usersCount,
        page: currentPage,
        pages: totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      result: error,
      message: "Error",
    });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { userEmail } = req.query;
  const result = await User.where("email").equals({
    $regex: ".*" + userEmail + "*.",
  });
  return res.json({
    success: true,
    result: result,
    message: null,
  });
};

export const editUser = async (req: Request | any, res: Response) => {
  const { userId } = req.userId;
  console.log("userid", userId);

  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  }).catch((err: any) => {
    return res.status(500).json({
      success: false,
      result: err,
      message: "Error updating user",
    });
  });
  return res.json({
    success: true,
    result: updatedUser,
    message: "User updated",
  });
};
