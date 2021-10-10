import { Router } from "express";
import passport from "passport";
import { createOffice } from "../controllers/office.controller";
const router = Router();

// for routes that need auth
router.post(
  "/offices",
  passport.authenticate("jwt", { session: false }),
  createOffice
);

export default router;
