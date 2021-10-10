export default {
  jwtSecret: process.env.JWT_SECRET || "p@ssword",
  DB: {
    URI:
      process.env.MONGODB_URI ||
      "mongodb+srv://dbUser:dbUserPassword@cluster0.h2zln.mongodb.net/pruebaPeruApps",
    USER: process.env.MONGODB_USER || "",
    PASSWORD: process.env.MONGODB_PASSWORD || "",
  },
};
