const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

//Get user details
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//User Login

router.post("/", [check("email", "Please include a valid email").isEmail(), check("password", "Password is required").exists()], async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("invalid user");
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get("JWTSecret"), { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
