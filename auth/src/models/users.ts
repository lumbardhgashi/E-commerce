import mongoose from "mongoose";
import { Password } from "../services/password";
import { IUser } from "@aaecomm/common";

interface UserAttrs extends Pick<IUser, "username" | "email" | "password"> {
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}


interface UserDoc extends Pick<IUser, "username" | "email" | "password" | "role">,  mongoose.Document {
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    required: true,
    default: ["user"],
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password; 
    },
    versionKey: false,
  },
  timestamps: true,
  
  
});


userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);


export { User };
