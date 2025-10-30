import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome Home Page");
});
app.get("/product", (req, res) => {
  fs.readFile("product.json", "utf-8", (err, data) => {
    if (err) {  
      res.status(500).send("Error reading products data");
    } else {
      const products = JSON.parse(data);
      res.json(products);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});