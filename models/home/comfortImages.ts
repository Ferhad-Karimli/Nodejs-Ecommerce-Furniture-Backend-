import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IComfortImages extends Document {
  images: String[];
  title: {
    en: String;
    az: String;
  };
}

const ComfortImagesSchema = new Schema(
  {
    images: {
      type: [String],
      required: true,
    },
    title: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    url: String,
  },
  { timestamps: true }
);

const comfortImagesValidate = (imagesValidate: IComfortImages) => {
  const schema = Joi.object({
    images: Joi.array().required(),
    title: Joi.object({
      en: Joi.string().required(),
      az: Joi.string().required(),
    }),
    url: Joi.string(),
  });
  return schema.validate(imagesValidate);
};

const ComfortImages = mongoose.model<IComfortImages>(
  "IComfortImages",
  ComfortImagesSchema
);
export { ComfortImages, comfortImagesValidate };
