import { Router } from "express";

const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Hola BE");
});

export default router;
