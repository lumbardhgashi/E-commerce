import mongoose from "mongoose";

interface SpecializimiAttrs {
  name: string;
}

export interface SpecializimiDoc extends mongoose.Document {
  name: string;
}

interface SpecializimiModel extends mongoose.Model<SpecializimiDoc> {
  build(attrs: SpecializimiAttrs): SpecializimiDoc;
}

const specializimiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

specializimiSchema.statics.build = (attrs: SpecializimiAttrs) => {
  return new Specializimi(attrs);
};

const Specializimi = mongoose.model<SpecializimiDoc, SpecializimiModel>(
  "Specializimi",
  specializimiSchema
);

export { Specializimi };
