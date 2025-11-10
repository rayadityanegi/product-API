import express from "express";
import fs from "fs";


const PORT = 3000;

const server = express();
server.use(express.json());

server.get("/home", (req, res) => {
  res.end("hi from home API");
});

server.get("/product", (req, res) => {
  fs.readFile("./product.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("error in reading file");
      return;
    }
    const products = JSON.parse(data);
    res.send(products);
});
});

server.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  fs.readFile("./product.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("error in reading file");
      return;
    }
    const products = JSON.parse(data);
    const product = products.find(p => p.id == productId);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send("Product not found");
    }
});
});

server.post("/login", (req, res) => {
  res.end("user created");
});


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
