const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

//get user profile

router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res.status(400).json({ errors: [{ msg: "There is no profile for this user" }] });
        }
        res.json({ profile });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//create profile
router.post(
    "/",
    [
        auth,
        [
            check("status", "Status is required")
                .not()
                .isEmpty(),
            check("skills", "Skills is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        var data = req.body;
        let profileFields = {};
        profileFields.user = req.user.id;
        if (data.company) profileFields.company = data.company;
        if (data.website) profileFields.website = data.website;
        if (data.location) profileFields.location = data.location;
        if (data.bio) profileFields.bio = data.bio;
        if (data.status) profileFields.status = data.status;
        if (data.githubusername) profileFields.githubusername = data.githubusername;

        if (data.skills) {
            profileFields.skills = data.skills.split(",").map(skill => {
                return skill.trim();
            });
        }

        profileFields.social = {};
        if (data.youtube) profileFields.social.youtube = data.youtube;
        if (data.twitter) profileFields.social.twitter = data.twitter;
        if (data.facebook) profileFields.social.facebook = data.facebook;
        if (data.linkedin) profileFields.social.linkedin = data.linkedin;
        if (data.instagram) profileFields.social.instagram = data.instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                //Update
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
                return res.json(profile);
            }

            //Create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
