import { model, Schema, Document } from "mongoose";

export interface IOffice extends Document {
  name: string;
  state: boolean;
}

const officeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

export default model<IOffice>("Office", officeSchema);
