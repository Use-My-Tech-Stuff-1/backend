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
      .then((user) => {
        res.status(201).json({ message: `Good job registering, ${credentials.username}`, data: user });
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
      .then(user => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `Welcome to our API, ${user.username}`,
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

function generateToken(user) {
  const payload = {
    userID: user.id,
    username: user.username,
    email: user.email
  }
  const options = {
    expiresIn: "4hr"
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
