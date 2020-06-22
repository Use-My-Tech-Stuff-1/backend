const db = require("../dbConfig.js");

module.exports = {
  getAllProducts,
  getProductsByOwner,
  getMyBorrowing,
  addProduct,
  updateProduct,
  deleteProduct,
  addBorrowed,
  returnBorrowed,
};

function getAllProducts(id) {
  if (id) {
    return (
      db
        .from("products as p")
        .select(
          "p.prod_id",
          "p.name",
          "p.image_URL",
          "p.price",
          "p.content",
          "u.username as ownerName",
          "u.id as owner_ID",
          "us.username as borrowerName",
          "us.id as borrower_ID"
        )
        // .join("owners as o", "o.product_id", "p.prod_id")
        .leftJoin("users as u", "u.id", "p.owner")
        .leftJoin("borrowers as b", "b.p_id", "p.prod_id")
        .leftJoin("users as us", "us.id", "b.borrower_id")
        .where({ prod_id: id })
    );
  } else {
    return (
      db
        .from("products as p")
        .select(
          "p.prod_id",
          "p.name",
          "p.image_URL",
          "p.price",
          "p.content",
          "u.username as ownerName",
          "u.id as owner_ID",
          "us.username as borrowerName",
          "us.id as borrower_ID"
        )
        // .join("owners as o", "o.product_id", "p.prod_id")
        .leftJoin("users as u", "u.id", "p.owner")
        .leftJoin("borrowers as b", "b.p_id", "p.prod_id")
        .leftJoin("users as us", "us.id", "b.borrower_id")
    );
  }
}

function getProductsByOwner(id) {
  return db("products as p")
    .join("users as u", "u.id", "p.owner")
    .select(
      "p.prod_id",
      "p.name",
      "p.image_URL",
      "p.price",
      "p.content",
      "u.username as ownerName",
      "u.id as owner_ID",
      "us.username as borrowerName",
      "us.id as borrower_ID"
    )
    .leftJoin("borrowers as b", "b.p_id", "p.prod_id")
    .leftJoin("users as us", "us.id", "b.borrower_id")
    .where({ owner: id });
}

function getMyBorrowing(id) {
  return db("borrowers as b")
    .join("products as p", "p.prod_id", "b.p_id")
    .leftJoin("users as u", "u.id", "p.owner")
    .leftJoin("users as us", "us.id", "b.borrower_id")
    .select(
      "p.prod_id",
      "p.name",
      "p.image_URL",
      "p.price",
      "p.content",
      "u.username as ownerName",
      "u.id as owner_ID",
      "us.username as borrowerName",
      "us.id as borrower_ID"
    )
    .where({ borrower_id: id });
}

function addProduct(product) {
  return db.insert(product, "id").into("products");
}

function updateProduct(changes, id) {
  return db("products").where({ prod_id: id }).update(changes);
}

function deleteProduct(id) {
  return db("products").where({ prod_id: id }).del();
}

function addBorrowed(id, changes) {
  return db("borrowers").where({ p_id: id }).insert(changes);
}

function returnBorrowed(id) {
  return db("borrowers").where({ p_id: id }).del();
}
