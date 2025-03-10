import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  images: string[];
  title: {
    en: string;
    az: string;
  };
  customerReview: string;
  price: number;
  discount: number;
  discountPrice: boolean;
  description: {
    en: string;
    az: string;
  };
  slug: string;
  category: mongoose.Types.ObjectId;
  subCategories: mongoose.Types.ObjectId;
  tags: string[];
  bestSeller: boolean;
}

const productSchema = new Schema({
  images: {
    type: [String],
    required: true,
  },
  title: {
    en: { type: String, required: true },
    az: { type: String, required: true },
  },
  customerReview: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Boolean,
  },
  description: {
    en: { type: String, required: true },
    az: { type: String, required: true },
  },
  sku: {
    type: String,
    required: true,
  },
  subCategories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  tags: {
    type: [String],
    required: true,
  },
  bestSeller: {
    type: Boolean,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const productValidate = (product: IProduct) => {
  const schema = Joi.object({
    images: Joi.array().required(),
    title: Joi.object({
      en: Joi.string().required().messages({
        "any.required": "English name is required",
      }),
      az: Joi.string().required().messages({
        "any.required": "Azerbaijani name is required",
      }),
    }),
    customerReview: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    discountPrice: Joi.boolean(),
    description: Joi.object({
      en: Joi.string().required().messages({
        "any.required": "English name is required",
      }),
      az: Joi.string().required().messages({
        "any.required": "Azerbaijani name is required",
      }),
    }),
    slug: Joi.string().required(),
    sku: Joi.string().required(),
    subCategories: Joi.string().required(),
    category: Joi.string().required(),
    tags: Joi.array().required(),
    bestSeller: Joi.boolean().required(),
  });

  return schema.validate(product);
};

const Product = mongoose.model<IProduct>("Product", productSchema);
export { Product, productValidate };
