const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.index_get);
router.get("/new", inventoryController.new_product_get);

module.exports = router;
