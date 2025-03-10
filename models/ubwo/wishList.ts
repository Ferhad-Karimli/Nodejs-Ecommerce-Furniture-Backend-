const Joi = require("Joi");
import mongoose, { Schema, Document } from "mongoose";

interface IWishList extends Document {
  wishListId: String;
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
}

const wishListSchema = new Schema({
  wishlistId: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

const wishListValidate = (wishlist: IWishList) => {
  const schema = new Joi.object({
    wishlistid: Joi.string(),
    product: Joi.string(),
  });

  return schema.validate(wishlist);
};

const WishList = mongoose.model("Wishlist", wishListSchema);
module.exports = { WishList, wishListValidate };
