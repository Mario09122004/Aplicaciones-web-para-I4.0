import { Document, model, Schema, Types } from "mongoose";

export interface IMenu extends Document {
  _id: Types.ObjectId,
  label: string,
  path: string,
  icon: string,
  roles: string[]
}
const menuSchema = new Schema({
  label: String,
  path: String,
  icon: String,
  roles: [{ type: String, ref: 'Role' }],
});

export const Menu = model<IMenu>("Menu", menuSchema, "menu");
