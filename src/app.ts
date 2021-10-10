import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";
import specialRoutes from "./routes/special.routes";
import officesRoutes from "./routes/offices.routes";
import userRoutes from "./routes/users.routes";

// initialization
const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// routes
app.get("/", (req, res) =>
  res.send(`The api is a localhost:${app.get("port")}`)
);

app.use(authRoutes);
app.use(specialRoutes);
app.use(officesRoutes);
app.use(userRoutes);

export default app;
