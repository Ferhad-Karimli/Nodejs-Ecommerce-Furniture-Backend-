import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface ISubCategory extends Document {
  name: {
    en: string;
    az: string;
  };
  slug: string;
  count: string;
  category: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
}

const subCategoryShcema = new Schema({
  name: {
    en: { type: String, required: true },
    az: {
      type: String,
      required: true,
    },
  },
  slug: { type: String, required: true },
  count: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const SubCategory = mongoose.model<ISubCategory>(
  "SubCategory",
  subCategoryShcema
);

const subCategoryValidate = (subCategory: ISubCategory) => {
  const schema = Joi.object({
    name: Joi.object({
      en: Joi.string().required().messages({
        "any.required": "English name is required",
      }),
      az: Joi.string().required().messages({
        "any.required": "Azerbaijani name is required",
      }),
    }),
    slug: Joi.string().required(),
    count: Joi.number().required(),
    category: Joi.string().required(),
    products: Joi.array().optional(),
  });
  return schema.validate(subCategory);
};

export { SubCategory, subCategoryValidate };
