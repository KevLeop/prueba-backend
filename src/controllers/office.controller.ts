import { Request, Response } from "express";
import Office from "../models/office";

export const createOffice = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const office = await Office.findOne({ name: req.body.name });
    if (office) {
      return res
        .status(400)
        .json({ success: false, message: "The office already exists" });
    }
    const newOffice = new Office(req.body);
    await newOffice.save();
    return res.status(201).json({
      success: true,
      result: newOffice,
      message: "Office created!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      result: error,
      message: "Error creating Office",
    });
  }
};
