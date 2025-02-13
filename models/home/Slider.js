const Joi = require("joi");
const { default: mongoose, Schema } = require("mongoose");
const sliderSchema = new Schema({
  image: [String],
  title: [String],
  description: [String],
});

const sliderValidate = (slider) => {
  const schema = new Joi.object({
    image: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
  });

  return schema.validate(sliderValidate);
};

const Slider = mongoose.model("Slider", sliderSchema);
module.exports = { Slider, sliderValidate };
