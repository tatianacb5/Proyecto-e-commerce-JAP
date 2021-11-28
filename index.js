const express = require("express");
const app = express();
const puerto = 3000; 
const category = require("./category.json");
const product = require("./product.json");
const cart = require("./cart.json");

app.get("/", (req, res) => {
    res.send("Tu servidor funciona");

}); 

app.get("/category", (req, res) =>{
    res.send(category); 
});

app.get("/product", (req, res) =>{
    res.send(product); 
});

app.get("/cart", (req, res) =>{
    res.send(cart); 
});

app.listen(puerto, () => {
    console.log('escuchando a http://localhost:' + puerto);
});
