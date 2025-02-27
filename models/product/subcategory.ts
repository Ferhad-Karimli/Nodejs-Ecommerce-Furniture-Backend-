import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface ISubCategory extends Document {
  name: string;
  count: string;
  category: mongoose.Types.ObjectId;
}

const subCategoryShcema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    // required: true,
  },
});

const SubCategory = mongoose.model<ISubCategory>(
  "SubCategory",
  subCategoryShcema
);

const subCategoryValidate = (subCategory: ISubCategory) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    count: Joi.number().required(),
    // category: Joi.string().required(),
  });
  return schema.validate(subCategory);
};

export { SubCategory, subCategoryValidate };
