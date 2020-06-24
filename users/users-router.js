const router = require("express").Router();

const Users = require("../data/models/listingModels");

//GET ALL USERS

router.get("/", (req, res) => {
    Users.getUser()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({ message: `something went wrong... ${err}, ${err.message}`})
    })
});

//GET USER BY ID

router.get("/:id", (req, res) => {
    const {id} = req.params;
    Users.getUser(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({ message: `something went wrong... ${err}, ${err.message}`})
    })
});

//UPDATE USER NAME

router.put("/:id/username", (req, res) => {
    const id = req.params.id;
    const username = req.body.username;
    console.log("ID", id, "tokenID", req.token.userID);
    if (req.token.userID == id) {
        Users.updateUserName(id, username)
        .then(update => {
            res.status(201).json({ message: "you changed your name!", update})
        })
        .catch(err => {
            res.status(500).json({ message: `something went wrong... ${err}, ${err.message}`})
        })
    } else {
        res.status(400).json({ message: "Im afraid you cant do that"})
    }
    
})

router.put("/:id/email", (req, res) => {
    const {id} = req.params;
    const email = req.body.email;
    console.log("ID", id, "tokenID", req.token.userID);
    if (req.token.userID == id) {
        Users.updateUserEmail(id, email)
        .then(update => {
            console.log(res)
            res.status(201).json({ message: "you changed your email!", update})
        })
        .catch(err => {
            res.status(500).json({ message: `something went wrong... ${err}, ${err.message}`})
        })
    } else {
        res.status(400).json({ message: "Im afraid you cant do that"})
    }
})

router.put("/:id/password", (req, res) => {
    const {id} = req.params;
    const password = req.body.password;
    if (req.token.userID == id) {
        Users.updateUserPassword(id, password)
        .then(update => {
            res.status(201).json({ message: "you changed your password!", update})
        })
        .catch(err => {
            res.status(500).json({ message: `something went wrong... ${err}, ${err.message}`})
        })
    } else {
        res.status(400).json({ message: "Im afraid you cant do that"})
    }
    
})

module.exports = router;