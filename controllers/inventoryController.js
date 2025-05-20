const queries = require("../models/queries");

// PRODUCTS

const index_get = async (req, res) => {
  try {
    const products = await queries.getAllProducts();
    const categories = await queries.getAllCategories();
    res.render("index", { products, categories });
  } catch (err) {
    console.error("index_get error:", err);
    res.status(500).send("Internal Server Error");
  }
};

const product_get = async (req, res) => {
  try {
    const product = await queries.getProductById(req.params.id);
    const categories = await queries.getAllCategories();
    res.render("edit", { product, categories });
  } catch (err) {
    console.error("product_get error:", err);
    res.status(500).send("Internal Server Error");
  }
};

const product_post = async (req, res) => {
  try {
    const { product_name, category, stock, price } = req.body;
    await queries.insertProduct(product_name, category, stock, price);
    res.redirect("/");
  } catch (err) {
    console.error("product_post error:", err);
    res.status(500).send("Internal Server Error");
  }
};

const product_put = async (req, res) => {
  try {
    const { product_name, category, stock, price } = req.body;
    const product_id = req.params.id;
    await queries.editProduct(product_name, category, stock, price, product_id);
    res.redirect("/");
  } catch (err) {
    console.error("product_put error:", err);
    res.status(500).send("Internal Server Error");
  }
};

const product_delete = async (req, res) => {
  try {
    const id = req.params.id;
    await queries.deleteProduct(id);
    res.sendStatus(204);
  } catch (err) {
    console.error("product_delete error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// CATEGORIES

const category_get = async (req, res) => {
  try {
    const categories = await queries.getAllCategories();
    res.render("form", { categories });
  } catch (err) {
    console.error("category_get error:", err);
    res.status(500).send("Internal Server Error");
  }
};

const category_post = async (req, res) => {
  try {
    const { category_name } = req.body;
    await queries.insertCategory(category_name);
    res.redirect("/category/new");
  } catch (err) {
    console.error("category_post error:", err);
    res.status(500).send("Internal Server Error");
  }
};

const category_delete = async (req, res) => {
  try {
    const id = req.params.id;
    await queries.removeCategory(id);
    res.sendStatus(204);
  } catch (err) {
    console.error("category_delete error:", err);
    res.status(500).send("Internal Server Error");
  }
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
