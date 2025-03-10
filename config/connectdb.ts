const mongoose = require("mongoose");

const authdb = {
  username: "karimli",
  password: "farhad77",
  cluster: "productcluster",
};

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${authdb.username}:${authdb.password}@productcluster.jgvb8.mongodb.net/?retryWrites=true&w=majority&appName=${authdb.cluster}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("mongodb connect is succesfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
