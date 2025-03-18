import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId[];
  totalPrice: number;
}

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      default: "pending",
      enum: ["completed", "pending", "cancel"],
    },
  },
  { timestamps: true }
);

const orderValidate = (data: IOrder) => {
  const schema = Joi.object({
    product: Joi.string().trim().required(),
    user: Joi.string().trim().required(),
    totalPrice: Joi.string().trim().required(),
    status: Joi.string(),
  });

  return schema.validate(data);
};

const Order = mongoose.model<IOrder>("Order", orderSchema);
export { Order, orderValidate };
