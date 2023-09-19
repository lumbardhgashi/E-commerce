import mongoose from "mongoose";

interface SemundjaAttrs {
  name: string;
  specializimiId: mongoose.Types.ObjectId;
}

export interface SemundjaDoc extends mongoose.Document {
  name: string;
  specializimiId: mongoose.Types.ObjectId;
}

interface SemundjaModel extends mongoose.Model<SemundjaDoc> {
  build(attrs: SemundjaAttrs): SemundjaDoc;
}

const semundjaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specializimiId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Specializimi",
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

semundjaSchema.statics.build = (attrs: SemundjaAttrs) => {
  return new Semundja(attrs);
};

const Semundja = mongoose.model<SemundjaDoc, SemundjaModel>(
  "Semundja",
  semundjaSchema
);

export { Semundja };
