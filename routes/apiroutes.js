const router = require("express").Router();
const Transaction = require("../models/transaction");

router.post("/api/transaction", ({ body }, res) => {
    console.log(body);
    Transaction.create(body)
    .then(transdb => {
        res.json(transdb)
    }).catch(err => {
        res.status(404).json(err)
        console.log(err)
    })
})

router.get("/api/transaction", (req, res) => {
    Transaction.find({})
    .then(transdb => {
        res.json(transdb)
    }).catch(err => {
        res.status(404).json(err)
        console.log(err)
    })
})

module.exports = router;
