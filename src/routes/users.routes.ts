import { Router } from "express";
import passport from "passport";
import { getAllUsers, getUserByEmail } from "../controllers/user.controller";

const router = Router();

// for routes that need auth
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getAllUsers
);

router.get(
  "/searchUser",
  passport.authenticate("jwt", { session: false }),
  getUserByEmail
);

export default router;
