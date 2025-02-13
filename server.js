const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectdb");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3006;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
