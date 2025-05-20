const pool = require("./pool");

// CATEGORIES

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY name");
  return rows;
}

async function insertCategory(category) {
  await pool.query("INSERT INTO categories(name) VALUES ($1)", [category]);
}

async function removeCategory(category) {
  await pool.query("DELETE FROM categories WHERE category_id = $1", [category]);
}

// PRODUCTS

async function getProductById(id) {
  const result = await pool.query(
    `
    SELECT p.product_id, p.name, c.name AS category, p.stock, p.price 
    FROM products AS p
    JOIN categories AS c ON p.category_id = c.category_id
    WHERE p.product_id = $1`,
    [id]
  );

  return result.rows[0];
}

async function insertProduct(name, category_id, stock, price) {
  await pool.query(
    "INSERT INTO products (name, category_id, stock, price) VALUES ($1,$2,$3,$4)",
    [name, category_id, stock, price]
  );
}

async function getAllProducts() {
  const { rows } = await pool.query(`
    SELECT p.product_id, p.name, c.name  AS category, p.stock, p.price 
    FROM products  AS p
    JOIN categories AS c
      ON p.category_id = c.category_id
    ORDER BY p.name;   
  `);
  return rows;
}

async function deleteProduct(id) {
  await pool.query("DELETE FROM products WHERE product_id = $1", [id]);
}

async function editProduct(
  product_name,
  category_id,
  stock,
  price,
  product_id
) {
  await pool.query(
    `UPDATE products
    SET name = $1,
    category_id = $2,
    stock = $3,
    price = $4
    WHERE product_id = $5;`,
    [product_name, category_id, stock, price, product_id]
  );
}

module.exports = {
  getAllCategories,
  removeCategory,
  insertCategory,

  insertProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getAllProducts,
};
