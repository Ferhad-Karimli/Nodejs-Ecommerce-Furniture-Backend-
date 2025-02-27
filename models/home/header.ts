import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface ISubtitle {
  text: string;
  link: string;
}

interface ITitle {
  text: string;
  link: string;
  subtitle: ISubtitle[];
}

interface IHeaderTitle {
  title: ITitle;
}

interface IHeader extends Document {
  headerTitle: IHeaderTitle[];
  logo: string;
}

const subtitleSchema = new Schema(
  {
    text: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false }
);

const titleSchema = new Schema(
  {
    text: { type: String, required: true },
    link: { type: String, required: true },
    subtitle: [subtitleSchema],
  },
  { _id: false }
);

const headerSchema = new Schema({
  headerTitle: [
    {
      title: titleSchema,
    },
  ],
  logo: {
    type: String,
    required: true,
  },
});

const headerValidate = (header: any) => {
  const schema = Joi.object({
    headerTitle: Joi.array()
      .items(
        Joi.object({
          title: Joi.object({
            text: Joi.string().required(),
            link: Joi.string().required(),
            subtitle: Joi.array()
              .items(
                Joi.object({
                  text: Joi.string().required(),
                  link: Joi.string().required(),
                })
              )
              .required(),
          }).required(),
        })
      )
      .required(),
    logo: Joi.string().required(),
  });

  return schema.validate(header);
};

const Header = mongoose.model<IHeader>("Header", headerSchema);
export { Header, headerValidate };
