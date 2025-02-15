import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface ISlider extends Document {
  image: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const sliderSchema = new Schema(
  {
    image: String,
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const sliderValidate = (slider: ISlider) => {
  const schema = Joi.object({
    image: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

  return schema.validate(slider);
};

const Slider = mongoose.model<ISlider>("Slider", sliderSchema);
export { Slider, sliderValidate };
