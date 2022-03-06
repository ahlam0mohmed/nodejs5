//const fetch = require('node-fetch');
const express = require('express')
const app = express()

app.set("view engine", "ejs");
app.set('views', 'public');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('products')
})

app.get('/products', async function (req, res) {
  const products = await get_data('https://dummyjson.com/products')
  console.log(products);
  res.render("products", { title: "products", products: products.products });
})

app.get('/products/search', async function (req, res) {
  console.log('one',req.query.blue);
  const products = await get_data(('https://dummyjson.com/products/search?q='+req.query.q))
  console.log(products)
  res.render("products", { title: "products", products: products.products });
})

app.get('/products/categories', async function (req, res) {
  const products = await get_data('https://dummyjson.com/products/categories')
  console.log(products);
  res.render("categories", { title: "categories", products: products });
})

app.get('/products/:i', async function (req, res) {
  const product = await get_data(('https://dummyjson.com/products/'+req.params.i))
  console.log(product)
  res.render("product", { title: "product", product: product });
})

app.get('/products/category/:i', async function (req, res) {
  const products = await get_data('https://dummyjson.com/products/category/'+req.params.i)
  console.log(products);
  res.render("products", { title: "products", products: products.products });
})
async function get_data(url) {
  const data = await fetch(url).then(res => res.json())
  return data
}
app.listen(3000)
console.log("ok");