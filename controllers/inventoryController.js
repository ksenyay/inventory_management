const queries = require("../models/queries");

// PRODUCTS

const index_get = async (req, res) => {
  const products = await queries.getAllProducts();
  const categories = await queries.getAllCategories();
  res.render("index", { products, categories });
};

const product_get = async (req, res) => {
  const product = await queries.getProductById(req.params.id);
  const categories = await queries.getAllCategories();
  res.render("edit", { product, categories });
};

const product_post = async (req, res) => {
  const { product_name, category, stock, price } = req.body;
  await queries.insertProduct(product_name, category, stock, price);
  res.redirect("/");
};

const product_put = async (req, res) => {
  const { product_name, category, stock, price } = req.body;
  const product_id = req.params.id;

  await queries.editProduct(product_name, category, stock, price, product_id);
  res.redirect("/");
};

const product_delete = async (req, res) => {
  const id = req.params.id;
  await queries.deleteProduct(id);
  res.sendStatus(204);
};

// CATEGORIES

const category_get = async (req, res) => {
  const categories = await queries.getAllCategories();
  res.render("form", { categories });
};

const category_post = async (req, res) => {
  const { category_name } = req.body;
  await queries.insertCategory(category_name);
  res.redirect("/category/new");
};

const category_delete = async (req, res) => {
  const id = req.params.id;
  await queries.removeCategory(id);
  res.sendStatus(204);
};

module.exports = {
  index_get,
  product_get,
  product_post,
  product_put,
  product_delete,

  category_get,
  category_post,
  category_delete,
};
