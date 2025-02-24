const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectdb");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3007;

const sliderRouter = require("./routers/home/Slider");
app.use("/api/slider", sliderRouter);

const productROuter = require("./routers/product/product");
app.use("/api/product", productROuter);

app.use("/uploads", express.static("uploads"));

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
