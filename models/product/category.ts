import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: {
    en: string;
    az: string;
  };
  image: string;
  slug: string;
  subCategories: mongoose.Types.ObjectId[];
  products: mongoose.Types.ObjectId[];
}

const categorySchema = new Schema(
  {
    name: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const categoryValidate = (category: ICategory) => {
  const schema = Joi.object({
    name: Joi.object({
      en: Joi.string().required().messages({
        "any.required": "English name is required",
      }),
      az: Joi.string().required().messages({
        "any.required": "Azerbaijani name is required",
      }),
    }).required(),
    image: Joi.string().required(),
    slug: Joi.string().required(),
    subCategories: Joi.array().optional(),
    products: Joi.array().optional(),
  });

  return schema.validate(category);
};

const Category = mongoose.model<ICategory>("Category", categorySchema);
export { Category, categoryValidate };
