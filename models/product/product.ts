import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  images: string[];
  title: string;
  customerReview: string;
  price: number;
  discount: number;
  discountPrice: boolean;
  description: string;
  category: mongoose.Types.ObjectId;
  subCategory: mongoose.Types.ObjectId;
  tags: string[];
}

const productSchema = new Schema({
  images: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
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
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  subCotegory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCotegory",
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
});

const productValidate = (product: IProduct) => {
  const schema = Joi.object({
    images: Joi.array().required(),
    title: Joi.string().required(),
    customerReview: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    discountPrice: Joi.boolean(),
    description: Joi.string().required(),
    sku: Joi.string().required(),
    subCotegory: Joi.string().required(),
    category: Joi.string().required(),
    tags: Joi.array().required(),
  });

  return schema.validate(product);
};

const Product = mongoose.model<IProduct>("Product", productSchema);
export { Product, productValidate };
