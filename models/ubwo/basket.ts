import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IBasket extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId[];
}

const basketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

const basketValidate = (basket: IBasket) => {
  const schema = Joi.object({
    user: Joi.string().trim().required(),
    product: Joi.array().required(),
  });
  return schema.validate(basket);
};

const Basket = mongoose.model<IBasket>("Basket", basketSchema);

export { Basket, basketValidate };
