const router = require("express").Router();

const Products = require('../data/models/listingModels');

router.get(('/'), (req, res) => {
    Products.getAllProducts()
      .then(prod => {
          res.status(200).json(prod)
      })
})





module.exports = router;