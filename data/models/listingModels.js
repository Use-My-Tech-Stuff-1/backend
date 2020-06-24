const db = require("../dbConfig.js");
const cryptZ = require("bcryptjs");

module.exports = {
  getAllProducts,
  getProductsByOwner,
  getMyBorrowing,
  addProduct,
  updateProduct,
  deleteProduct,
  addBorrowed,
  returnBorrowed,
  getUser,
  updateUserName,
  updateUserPassword,
  updateUserEmail
};

function getAllProducts(id) {
  if (id) {
    return db
      .from("products as p")
      .select(
        "p.prod_id",
        "p.name",
        "p.image_URL",
        "p.price",
        "p.content",
        "u.username as ownerName",
        "p.owner",
        "us.username as borrowerName",
        "us.id as borrower_ID"
      )
      .leftJoin("users as u", "u.id", "p.owner")
      .leftJoin("borrowers as b", "b.p_id", "p.prod_id")
      .leftJoin("users as us", "us.id", "b.borrower_id")
      .where({ prod_id: id })
      .first();
  } else {
    return db
      .from("products as p")
      .select(
        "p.prod_id",
        "p.name",
        "p.image_URL",
        "p.price",
        "p.content",
        "u.username as ownerName",
        "p.owner",
        "us.username as borrowerName",
        "us.id as borrower_ID"
      )
      .leftJoin("users as u", "u.id", "p.owner")
      .leftJoin("borrowers as b", "b.p_id", "p.prod_id")
      .leftJoin("users as us", "us.id", "b.borrower_id");
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
      "p.owner",
      "us.username as borrowerName",
      "us.id as borrower_ID"
    )
    .leftJoin("borrowers as b", "b.p_id", "p.prod_id")
    .leftJoin("users as us", "us.id", "b.borrower_id")
    .where({ owner: id })
    .first();
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
      "p.owner",
      "us.username as borrowerName",
      "us.id as borrower_ID"
    )
    .where({ borrower_id: id });
}

function addProduct(product) {
  return db.insert(product).into("products");
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

function getUser(id) {
  if (id) {
    return db("users as u").where({ id }).select("u.username", "u.email", "u.id").first();
  } else {
    return db("users as u").select("u.username", "u.email", "u.id");
  }
}

function updateUserName(id, username) {
  return db("users")
    .where({ id })
    .update({ username: username });
}

function updateUserPassword(id, password) {
  hashedPw = cryptZ.hashSync(password, 12);
  return db("users")
  .where({ id })
  .update({ password: hashedPw });
}

function updateUserEmail(id, email) {
  return db("users")
  .where({ id })
  .update({ email: email });
}