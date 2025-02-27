import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface ISlider extends Document {
  image: string;
  title: {
    en: string;
    az: string;
  };
  description: {
    en: string;
    az: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const sliderSchema = new Schema(
  {
    image: String,
    title: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const sliderValidate = (slider: ISlider) => {
  const schema = Joi.object({
    image: Joi.string().required(),
    title: Joi.object({
      en: Joi.string().required(),
      az: Joi.string().required(),
    }).required(),
    description: Joi.object({
      az: Joi.string().required(),
      en: Joi.string().required(),
    }).required(),
  });

  return schema.validate(slider);
};

const Slider = mongoose.model<ISlider>("Slider", sliderSchema);
export { Slider, sliderValidate };
