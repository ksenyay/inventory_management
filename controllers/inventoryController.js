const categories = [
  "Indoor Plants",
  "Outdoor Plants",
  "Succulents & Cacti",
  "Flowering Plants",
  "Herbs & Edible Plants",
  "Trees & Large Plants",
];

const index_get = (req, res) => {
  res.render("index");
};

const new_product_get = (req, res) => {
  res.render("form", { categories: categories });
};

module.exports = {
  index_get,
  new_product_get,
};
