const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("POST route");
});

module.exports = router;
