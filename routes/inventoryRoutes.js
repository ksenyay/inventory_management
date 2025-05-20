const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.index_get);
router.get("/product/:id", inventoryController.product_get);
router.post("/product/new", inventoryController.product_post);
router.post("/product/:id", inventoryController.product_put);
router.delete("/product/:id", inventoryController.product_delete);

router.get("/category/new", inventoryController.category_get);
router.post("/category/new", inventoryController.category_post);
router.delete("/category/:id", inventoryController.category_delete);

module.exports = router;
