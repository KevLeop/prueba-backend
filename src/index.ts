import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import IndexRoutes from "./routes";
// initialization
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    helpers: require("./lib/helpers"),
  })
);

app.set("view engine", ".hbs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/", IndexRoutes);

//Static files
app.use(express.static(path.join(__dirname, "public")));

// Starting server
app.listen(app.get("port"), () =>
  console.log(`Server running on port ${app.get("port")}`)
);
