import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IWishList extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId[];
}

const wishListSchema = new Schema(
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
  },
  { timestamps: true }
);

const wishListValidate = (data: IWishList) => {
  const schema = Joi.object({
    product: Joi.string().trim().required(),
    user: Joi.string().trim().required(),
  });

  return schema.validate(data);
};

const WishList = mongoose.model<IWishList>("WishList", wishListSchema);
export { WishList, wishListValidate };
