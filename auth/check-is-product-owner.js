const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
const db = require("../data/models/listingModels");

module.exports = (req, res, next) => {
  const id = req.token.userID;

  db.getProductsByOwner(id)
    .then((products) => {
        
        if (products.owner_ID === id) {
            console.log("PRODUCTS", products, "OWNER_ID", products.owner_ID, "ID", id)
            next();
        } else {
            res.status(403).json({message: "your role is restricted"})
        }
    })
    .catch((err) => {
      res.status(500).json(err);
    });

  

};
