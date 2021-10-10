import { Router } from "express";
import passport from "passport";
const router = Router();

// for routes that need auth
router.get(
  "/special",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.send("success")
);

export default router;
