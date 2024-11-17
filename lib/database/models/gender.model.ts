import { Document, Schema, model, models } from "mongoose";

export interface IGender extends Document {
  _id: string;
  name: string;
}

const GenderSchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const Gender = models.Gender || model('Gender', GenderSchema);

export default Gender;