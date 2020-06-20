const router = require("express").Router();

const Products = require("../data/models/listingModels");

//GETS ALL PRODUCTS
router
  .route("/")
  .get((req, res) => {
    Products.getAllProducts()
      .then((prod) => {
        res.status(200).json(prod);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: `something went wrong, ${err}, ${err.message}` });
      });
  })

//CREATES NEW PRODUCT LISTING
  .post((req, res) => {
    Products.addProduct(req.body)
      .then((prod) => {
        res.status(201).json({ message: "successfully added listing", prod });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: `something went wrong, ${err}, ${err.message}` });
      });
  });

//GETS PRODUCT BY ID
router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    Products.getAllProducts(id)
      .then((prod) => {
        res.status(200).json(prod);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: `something went wrong, ${err}, ${err.message}` });
      });
  })

//DELETES PRODUCT BY ID
  .delete((req, res) => {
    const { id } = req.params;
    Products.deleteProduct(id)
      .then((prod) => {
        res.status(200).json({ message: "Product deleted", prod });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: `something went wrong, ${err}, ${err.message}` });
      });
  });

//GETS ALL PRODUCTS THAT AREN'T BORROWED -- not working somehow...
// router.get("/available", (req, res) => {
//   Products.getAllProducts()
//     .then((resp) => {
//         console.log("hiu")
//     //   const avail = prods.filter((prod) => {
//     //     return prod.available != 0;
//     //   });
//       res.status(200).json(resp);
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ message: `something went wrong, ${err}, ${err.message}` });
//     });
// });



//GET PRODUCTS BY AN OWNER -- NEEDS RESTRICTED MIDDLEWARE TO PUT REQUEST
router.route("/by-owner/:id").get((req, res) => {
  const { id } = req.params;
  Products.getProductsByOwner(id)
    .then((prod) => {
      if (prod.length === 0) {
        return res
          .status(404)
          .json({ message: "This user does not have any listings" });
      } else {
        return res.status(200).json(prod);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `something went wrong, ${err}, ${err.message}` });
    });
});

//UPDATE METHOD FOR LISTERS TO UPDATE THEIR LISTINGS
router.put(
  "/:id/update",
  /*insert restricted middleware here*/ (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    Products.getAllProducts(id)
      .then((prod) => {
        if (prod.length === 0) {
          return res
            .status(404)
            .json({ message: "This user does not have any listings" });
        } else {
          Products.updateProduct(changes, id)
            .then((prod) => {
              res.status(201).json({ message: "update success", prod });
            })
            .catch((err) => {
              res.status(500).json({
                message: `something went wrong, ${err}, ${err.message}`,
              });
            });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: `something went wrong, ${err}, ${err.message}` });
      });
  }
);

//GETS ALL THE PRODUCTS YOU ARE CURRENTLY BORROWING --- NEEDS A MIDDLEWARE TO RESTRICT IT SO ONLY BORROWER CAN SEE THIS
router.get(
  "/borrowing/:id",
  /*insert middleware */ (req, res) => {
    const { id } = req.params;
    Products.getMyBorrowing(id)
      .then((prod) => {
        res.status(200).json(prod);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: `something went wrong, ${err}, ${err.message}` });
      });
  }
);

//UPDATES THE ITEM TO BEING UNAVAILABLE AND ASSIGNS BORROWER WHEN BORROWING ITEM

router.put("/:id/borrow-item", (req, res) => {
  const id = req.params.id;
  const borrowerID = req.body.userID;
  Products.getAllProducts(id)
    .then((prod) => {
      if (prod.length === 0) {
        return res.status(404).json({ message: "this item does not exist" });
      } else {
        Products.addBorrowed(id, borrowerID)
          .then((bor) => {
            res.status(201).json({ message: "You borrowed the item!", bor });
          })
          .catch((err) => {
            res.status(500).json({
              message: `something went wrong, ${err}, ${err.message}`,
            });
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `something went wrong, ${err}, ${err.message}` });
    });
});

//UPDATES ITEM TO BEING AVAILABLE WHEN USER RETURNS THE ITEM
router.put(
  "/:id/return-item",
  /*insert middleware */ (req, res) => {
    const { id } = req.params;
    Products.getAllProducts(id)
      .then((prod) => {
        if (prod.length === 0) {
          return res.status(404).json({ message: "this item does not exist" });
        } else {
          Products.returnBorrowed(id)
            .then((prod) => {
              res.status(200).json(prod);
            })
            .catch((err) => {
              res.status(500).json({
                message: `something went wrong, ${err}, ${err.message}`,
              });
            });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: `something went wrong, ${err}, ${err.message}` });
      });
  }
);

module.exports = router;