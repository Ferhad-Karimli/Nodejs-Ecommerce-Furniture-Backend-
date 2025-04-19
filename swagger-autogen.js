
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Node.js E-commerce Furniture Backend API",
    description: "E-commerce API üçün Swagger sənədləri",
  },
  host: process.env.HOST || "localhost:3000", // Dinamik host
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.ts"]; 

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require("./server"); 
});