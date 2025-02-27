const { languageMiddleware } = require("./middlewares/language");

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectdb");
const app = express();
app.use(cors());
app.use(express.json());
app.use(languageMiddleware);

const PORT = 3007;

const sliderRouter = require("./routers/home/Slider");
app.use("/api/slider", sliderRouter);

const headerRouter = require("./routers/home/header");
app.use("/api/header", headerRouter);

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
