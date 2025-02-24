import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  title: string;
  image: string;
  slug: string;
}

const categorySchema = new Schema(
  {
    title: String,
    image: String,
    slug: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCotegories: [
      {
        name: { type: String, required: true },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const categoryValidate = (category: ICategory) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    slug: Joi.string().required(),
    subCotegories: Joi.array().required(),
  });

  return schema.validate(category);
};

const Category = mongoose.model<ICategory>("Category", categorySchema);
export { Category, categoryValidate };
