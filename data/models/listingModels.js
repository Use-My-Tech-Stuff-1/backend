const db = require("../dbConfig.js");

module.exports = {
    getAllProducts,
    getAllAvailableProducts,
    getProductsByOwner,
    getMyBorrowing,
    addProduct,
    updateProduct,
    deleteProduct,
    addBorrowed,
    returnBorrowed
}

function getAllProducts() {
    return db("products");
}

function getAllAvailableProducts() {
    return db("products").where({ available: true });
}

function getProductsByOwner(id) {
    return db("products").where({ owner: id });
}

function getMyBorrowing(id) {
    return db("products").where({ owner: borrower });
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

function addBorrowed() {

}

function returnBorrowed() {
    
}