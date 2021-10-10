import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config";

// const dbOptions: ConnectOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

mongoose.connect(config.DB.URI);

const connection = mongoose.connection;

connection.once("open", () => console.log("MongoDB connection stablished"));

connection.on("error", (err) => {
  console.log(err);
  process.exit(0);
});
