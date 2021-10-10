import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import office from "./office";
// import moment from "moment-timezone";
// const peruvianDate = moment.tz(Date.now(), "America/Lima");
export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  birthDate: {
    type: Date,
    required: true,
  },
  phone: String,
  office: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified()) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
export default model<IUser>("User", userSchema);
