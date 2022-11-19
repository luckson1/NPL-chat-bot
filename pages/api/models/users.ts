import { Schema, model, models, Model, Types } from "mongoose";
import bcrypt from "bcryptjs";
export interface UserType {
  name?: string;
  image?: string;
  email?: string;
  password: string;
  isPasswordMatch: (password: string) => boolean;
  _id: Types.ObjectId
  id: string
}
const userSchema = new Schema<UserType>({
  name: String,
  image: String,
  email: String,
  password: { type: String, required: true },
});
//Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// check password matching
//Verify password
userSchema.methods.isPasswordMatch = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Users = (models.User || model("User", userSchema)) as Model<UserType>;

export default Users;
