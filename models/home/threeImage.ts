import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IThreeImage extends Document {
  image: string;
  title: {
    en: string;
    az: string;
  };
  url: string;
}

const threeImageSchema = new Schema(
  {
    image: String,
    title: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    url: String,
  },
  {
    timestamps: true,
  }
);

const threeImageValidate = (slider: IThreeImage) => {
  const schema = Joi.object({
    image: Joi.string().required(),
    title: Joi.object({
      en: Joi.string().required(),
      az: Joi.string().required(),
    }).required(),
    url: Joi.string().required(),
  });

  return schema.validate(slider);
};

const ThreeImage = mongoose.model<IThreeImage>("ThreeImage", threeImageSchema);
export { ThreeImage, threeImageValidate };
