import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IThreeImage extends Document {
  image: string;
  title: string;
  url: string;
}

const threeImageSchema = new Schema(
  {
    image: String,
    title: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

const threeImageValidate = (slider: IThreeImage) => {
  const schema = Joi.object({
    image: Joi.string().required(),
    title: Joi.string().required(),
    url: Joi.string().required(),
  });

  return schema.validate(slider);
};

const ThreeImage = mongoose.model<IThreeImage>("ThreeImage", threeImageSchema);
export { ThreeImage, threeImageValidate };
