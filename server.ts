const { languageMiddleware } = require("./middlewares/language");

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectdb");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(languageMiddleware);

const PORT = 3007;

const authRouter = require("./routers/auth/user");
app.use("/", authRouter);

const sliderRouter = require("./routers/home/Slider");
app.use("/api/slider", sliderRouter);

const headerRouter = require("./routers/home/header");
app.use("/api/header", headerRouter);

const threeImageRouter = require("./routers/home/threeImage");
app.use("/api/threeImage", threeImageRouter);

const comfortImages = require("./routers/home/comfortImages");
app.use("/api/comfortImages", comfortImages);

// product
const productROuter = require("./routers/product/product");
app.use("/api/product", productROuter);

// category
const categoryRouter = require("./routers/product/category");
app.use("/api/category", categoryRouter);

// subcategory
const subCategoryRouter = require("./routers/product/subcategory");
app.use("/api/subcategory", subCategoryRouter);

app.use("/uploads", express.static("uploads"));

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
