import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId[];
  totalPrice: number;
  status?: string;
}

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "cancel"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const orderValidate = (data: IOrder) => {
  const schema = Joi.object({
    product: Joi.array().items(Joi.string().trim().required()).required(),
    user: Joi.string().trim().required(),
    totalPrice: Joi.number().required(),
    status: Joi.string().valid("completed", "pending", "cancel"),
  });

  return schema.validate(data);
};

const Order = mongoose.model<IOrder>("Order", orderSchema);
export { Order, orderValidate };
