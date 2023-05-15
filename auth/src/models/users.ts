import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  username: string;
  email: string;
  password: string;
  role?: string[]
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}


interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  username: string;
  role: string[];
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
    versionKey: false
  }
});

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed);
    }
    done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);


export { User };
