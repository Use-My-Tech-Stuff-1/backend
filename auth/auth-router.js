const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
const db = require("../data/dbConfig.js");
const {isValid} = require("../config/validation.js");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const hash = bcryptjs.hashSync(credentials.password, 8);
    credentials.password = hash;

    db("users")
      .insert(credentials)
      .then((users) => {
        res.status(201).json({ message: `Good job registering, ${credentials.username}`, data: users });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: `error registering... ${err}: ${err.message}` });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  

  if (isValid(req.body)) {
    db("users").where('username', username).first()
      .then(users => {
        // compare the password the hash stored in the database
        if (users && bcryptjs.compareSync(password, users.password)) {
          const token = generateToken(users);
          res.status(200).json({ message: `Welcome to our API, ${users.username}`,
          token
        });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function generateToken(users) {
  const payload = {
    userID: users.id,
    username: users.username,
    email: users.email
  }
  const options = {
    expiresIn: "4hr"
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
