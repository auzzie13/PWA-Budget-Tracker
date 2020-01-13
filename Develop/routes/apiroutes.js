const router = require("express").Router();
const transaction = require("../models/transaction");

router.post("/api/transaction", (req, res) => {
    console.log(req.body);
    const value = req.body;
    console.log(Object.keys(value));
    transaction.create(value)
    .then(dbtrans => {
        res.json(dbtrans)
    }).catch(err => {
        res.status(404).json(err)
    })
})

module.exports = router;
