import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  image: string;
  slug: string;
  subCategories: mongoose.Types.ObjectId[];
}

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  { timestamps: true }
);

const categoryValidate = (category: ICategory) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    slug: Joi.string().required(),
    subCategories: Joi.array(),
  });

  return schema.validate(category);
};

const Category = mongoose.model<ICategory>("Category", categorySchema);
export { Category, categoryValidate };
