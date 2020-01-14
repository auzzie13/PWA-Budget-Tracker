const router = require("express").Router();
const Transaction = require("../models/transaction");

router.post("/api/transaction", ({ body }, res) => {
    Transaction.create(body)
    .then(transdb => {
        res.json(transdb)
    }).catch(err => {
        res.status(404).json(err)
        console.log(err)
    })
})

module.exports = router;
