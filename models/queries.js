const pool = require("./pool");

// CATEGORIES

async function getAllCategories() {
  try {
    const { rows } = await pool.query("SELECT * FROM categories ORDER BY name");
    return rows;
  } catch (err) {
    console.error("getAllCategories error:", err);
    throw err;
  }
}

async function insertCategory(category) {
  try {
    await pool.query("INSERT INTO categories(name) VALUES ($1)", [category]);
  } catch (err) {
    console.error("insertCategory error:", err);
    throw err;
  }
}

async function removeCategory(category) {
  try {
    await pool.query("DELETE FROM categories WHERE category_id = $1", [
      category,
    ]);
  } catch (err) {
    console.error("removeCategory error:", err);
    throw err;
  }
}

// PRODUCTS

async function getProductById(id) {
  try {
    const result = await pool.query(
      `
      SELECT p.product_id, p.name, c.name AS category, p.stock, p.price 
      FROM products AS p
      JOIN categories AS c ON p.category_id = c.category_id
      WHERE p.product_id = $1`,
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("getProductById error:", err);
    throw err;
  }
}

async function insertProduct(name, category_id, stock, price) {
  try {
    await pool.query(
      "INSERT INTO products (name, category_id, stock, price) VALUES ($1,$2,$3,$4)",
      [name, category_id, stock, price]
    );
  } catch (err) {
    console.error("insertProduct error:", err);
    throw err;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await pool.query(`
      SELECT p.product_id, p.name, c.name AS category, p.stock, p.price 
      FROM products AS p
      JOIN categories AS c ON p.category_id = c.category_id
      ORDER BY p.name;
    `);
    return rows;
  } catch (err) {
    console.error("getAllProducts error:", err);
    throw err;
  }
}

async function deleteProduct(id) {
  try {
    await pool.query("DELETE FROM products WHERE product_id = $1", [id]);
  } catch (err) {
    console.error("deleteProduct error:", err);
    throw err;
  }
}

async function editProduct(
  product_name,
  category_id,
  stock,
  price,
  product_id
) {
  try {
    await pool.query(
      `UPDATE products
       SET name = $1,
           category_id = $2,
           stock = $3,
           price = $4
       WHERE product_id = $5;`,
      [product_name, category_id, stock, price, product_id]
    );
  } catch (err) {
    console.error("editProduct error:", err);
    throw err;
  }
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
