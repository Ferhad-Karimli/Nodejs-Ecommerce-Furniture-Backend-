const { Slider, sliderValidate } = require("../../models/home/Slider");

exports.SliderList = async (req, res) => {
  const { error } = sliderValidate(req.body);
  if (error) {
    res.status(400).send(error.messages);
  } else {
    const slider = await Slider.find();
    res.status(200).json(slider);
  }
};

exports.SliderAdd = async (req, res) => {
  const { error } = sliderValidate(req.body);

  if (error) {
    res.status(400).send(error.messages);
  } else {
    const category = new Slider(req.body);
    const result = await category.save();
    res.status(200).json(result);
  }
};

exports.sliderEdit = async (req, res) => {
  const { error } = sliderValidate(req.body);

  if (error) {
    res.status(400).send(error.messages);
  } else {
    const category = await Category.findByIdAndUpdate(req.params.id);
    await category.save();
    res.status(200).json(category);
  }
};

exports.sliderDel = async (req, res) => {
  const slider = await Slider.findByIdAndDelete(req.params.id);
  if (!slider) {
    return res.status(404).send("Slider not found");
  } else {
    res.status(200).json(slider);
  }
};
