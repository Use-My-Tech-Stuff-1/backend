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
        return db("products as p")
        .join("users as u", "u.id", "p.owner")
        .leftJoin("users as us", "us.id", "p.borrower")
        .select("u.username as ownerName", "us.username as borrowerName", "p.*", "p.id as pID").where({pID: id});
    } else {
        return db("products as p")
    .join("users as u", "u.id", "p.owner")
    .leftJoin("users as us", "us.id", "p.borrower")
    .select("u.username as ownerName", "us.username as borrowerName", "p.*");
    }
  
}




function getProductsByOwner(id) {
  return db("products").where({ owner: id });
}

function getMyBorrowing(id) {
  return db("products").where({ borrower: id });
}

function addProduct(product) {
  return db("products").insert(product, "id");
}

function updateProduct(changes, id) {
  return db("products").where({ id }).update(changes);
}

function deleteProduct(id) {
  return db("products").where({ id }).del();
}

function addBorrowed(id, borrowerID) {
  return db("products").where({ id }).update({
    available: false,
    borrower: borrowerID,
  });
}

function returnBorrowed(id) {
  return db("products").where({ id }).update({
    available: true,
    borrower: null,
  });
}
